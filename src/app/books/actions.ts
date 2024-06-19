'use server';

import db from '@/lib/db';
import sanitizeHtml from 'sanitize-html';
import { BookFormData, BooksSuggestion, BooksType, ProcessedContent, QueryOptions } from '@/types/books';
import { BookStatus } from '@prisma/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function getNamesForSuggestion(): Promise<BooksSuggestion[]> {
   return await db.books.findMany({
      select: { name: true, id: true, bookSeries: { select: { id: true, name: true, author: true } } },
   });
}

export async function getTextsForSuggestions(): Promise<string[]> {
   try {
      const titles = await getNamesForSuggestion();

      return Array.from(
         new Set(
            titles.reduce(
               (list: string[], item: any) => [...list, item.name, item.bookSeries?.name, item.bookSeries?.author],
               []
            )
         )
      );
   } catch (e) {
      return [];
   }
}

export async function getBook(id: number) {
   const book = await db.books.findFirst({
      where: { id: { equals: id } },
      select: {
         id: true,
         name: true,
         status: true,
         bookSeries: {
            select: {
               id: true,
               name: true,
               author: true,
               books: { select: { id: true, name: true } },
               character: { select: { id: true, name: true } },
            },
         },
         chapters: { select: { id: true, title: true } },
      },
   });

   return book;
}

export async function getBooks(searchParams: QueryOptions): Promise<BooksType[]> {
   const query = searchParams.q;
   const order = searchParams.order !== 'empty' ? searchParams.order : 'desc';
   const searchIn = searchParams.searchIn || 'all';

   const books = await db.books.findMany({
      where: {
         OR: [
            ...(['all', 'book'].includes(searchIn)
               ? [
                    {
                       name: {
                          contains: query,
                       },
                    },
                 ]
               : []),
            ...(['all', 'author'].includes(searchIn)
               ? [
                    {
                       bookSeries: {
                          author: {
                             contains: query,
                          },
                       },
                    },
                 ]
               : []),
            ...(['all', 'series'].includes(searchIn)
               ? [
                    {
                       bookSeries: {
                          name: {
                             contains: query,
                          },
                       },
                    },
                 ]
               : []),
         ],
      },
      orderBy: { createdAt: order || 'desc' },
      include: { bookSeries: true },
   });
   return books;
}

function processContent(content: string): ProcessedContent[] {
   const sanitizedContent: string = sanitizeHtml(content, {
      allowedTags: ['b', 'i', 'em', 'strong', 'p', 'h1'],
      allowedAttributes: {},
      allowedIframeHostnames: [],
      parser: {
         lowerCaseTags: true,
      },
   });
   return sanitizedContent.split('<h1>').reduce((chapters: ProcessedContent[], chapter: string): ProcessedContent[] => {
      if (!chapter.trim()) {
         return chapters;
      }
      const [title, content] = chapter.split('</h1>');
      return [
         ...chapters,
         {
            title,
            content,
         },
      ];
   }, []);
}

export async function addBook(initialState: BookFormData, formData: FormData) {
   const seriesName = (formData.get('series') || '') as string;
   const bookName = (formData.get('name') || '') as string;
   const author = (formData.get('author') || '') as string;
   const status = (formData.get('status') || BookStatus.COMPLETED) as BookStatus;
   const content = (formData.get('content') || '') as string;

   if (bookName.trim().length === 0) {
      initialState.errors.name = { error: true, message: 'Book name is required, please add book name' };
   }

   if (author.trim().length === 0) {
      initialState.errors.author = { error: true, message: 'Author file is required, please add book author' };
   }

   if (content.trim().length === 0) {
      initialState.errors.content = { error: true, message: 'Content is required, please add book content' };
   }

   const contentList = processContent(content);

   if (contentList.length === 0) {
      initialState.errors.content = {
         error: true,
         message:
            'Content field seams to not contain correct data. The date is not in recognizable format. Please view the Help page if you experience problems with it ',
      };
   }

   if (!contentList.every(item => item.title?.length > 0 && item.content?.length > 0)) {
      initialState.errors.content = {
         error: true,
         message:
            "Content field seams to not contain correct data. When the content is split it can't detect chapter title and content. Please view the Help page if you experience problems with it ",
      };
   }

   if (Object.values(initialState.errors).some(item => item.error)) {
      initialState.status = false;
      initialState.message = 'Please review';
      return initialState;
   }

   let seriesData;
   if (seriesName.trim().length > 0) {
      seriesData = await db.bookSeries.findFirst({
         where: { name: { contains: seriesName }, author: { contains: author } },
      });
   }

   if (!seriesData) {
      seriesData = await db.bookSeries.create({
         data: { name: seriesName.trim() || bookName, author, description: '' },
      });
   }

   const book = await db.books.create({
      data: {
         name: bookName,
         status,
         bookSeriesId: seriesData?.id,
      },
   });

   await db.chapters.createMany({ data: contentList.map(item => ({ ...item, bookId: book.id })) });

   revalidatePath('/books');
   revalidatePath('/book');
   redirect('/books');

   return { ...initialState, success: true, status: true, message: '' };
}

export async function editBook(initialState: BookFormData, formData: FormData) {
   const seriesName = (formData.get('series') || '') as string;
   const bookName = (formData.get('name') || '') as string;
   const author = (formData.get('author') || '') as string;
   const status = (formData.get('status') || BookStatus.COMPLETED) as BookStatus;
   console.log({ id: initialState.data.id, seriesID: initialState.data.seriesId }, formData);
   if (seriesName.trim() !== initialState.content?.bookSeries?.name) {
   }
   return initialState;
}

export async function deleteBook(initialState: null, formData: FormData) {
   const transactionList = [];
   const bookID = parseInt(formData.get('bookID') as string, 10);
   const seriesID = parseInt(formData.get('seriesID') as string, 10);

   if (!bookID) {
      throw new Error("Couldn't find book Id for deletion.");
   }

   const deletingChapters = db.chapters.deleteMany({
      where: { bookId: bookID },
   });

   const deletingBook = db.books.delete({ where: { id: bookID } });

   transactionList.push(deletingChapters);
   transactionList.push(deletingBook);

   if (!!seriesID) {
      const deletingCharacter = db.character.deleteMany({ where: { bookSeriesId: seriesID } });
      const deletingSeries = db.bookSeries.delete({ where: { id: seriesID } });

      transactionList.push(deletingCharacter);
      transactionList.push(deletingSeries);
   }

   await db.$transaction(transactionList);

   revalidatePath('/books');
   revalidatePath('/book');
   redirect('/books');

   return null;
}
