'use server';

import ai_result from '@/lib/ai_result';
import { breakContentToBaches, processJSON, requestHighlight } from '@/lib/aiTools';
import { highlightContent, processColoredContent, processContent } from '@/lib/contentParser';
import db from '@/lib/db';
import { AddChaptersElement, AddChaptersFormData, QueryOptions } from '@/types/chapters';
import { Character, Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getChapters(id: number, searchParams?: QueryOptions) {
   const query = searchParams?.q || null;
   const status = searchParams?.status || null;

   const chapters = await db.chapters.findMany({
      where: { bookId: id, ...(!!query ? { title: { contains: query } } : {}), ...(!!status ? { status } : {}) },
      orderBy: { createdAt: 'desc' },
   });
   return chapters;
}

export async function getChapter(bookId: number, chapterId: number) {
   const chapter = await db.chapters.findUnique({
      where: { id: chapterId, bookId },
      select: {
         id: true,
         title: true,
         content: true,
         status: true,
         progress: true,
         aiProcessed: true,
         book: { select: { name: true, id: true, bookSeries: { select: { id: true, character: true } } } },
      },
   });
   return chapter;
}

export async function processChaptersForAdding(initialState: AddChaptersFormData, formData: FormData) {
   if (!formData?.has('content')) {
      throw new Error('Received incorrect parameters or wrong type parameters');
   }
   const content = formData.get('content') as string;

   const contentList = processContent(content);

   if (contentList.length === 0) {
      initialState = {
         ...initialState,
         error: true,
         content,
         message:
            'Content field seams to not contain correct data. The date is not in recognizable format. Please view the Help page if you experience problems with it ',
      };
   }

   if (!contentList.every(item => item.title?.length > 0 && item.content?.length > 0)) {
      initialState = {
         ...initialState,
         error: true,
         content,
         message:
            "Content field seams to not contain correct data. When the content is split it can't detect chapter title and content. Please view the Help page if you experience problems with it ",
      };
   }

   if (initialState?.error) {
      return initialState;
   }

   const chapters = await db.chapters.findMany({
      select: { title: true },
      where: { bookId: initialState.bookId, title: { in: contentList.map(item => item.title) } },
      orderBy: { createdAt: 'desc' },
   });

   return {
      ...initialState,
      error: false,
      chapters: contentList.map(item => ({
         ...item,
         exists: chapters.map(chapter => chapter.title).includes(item.title),
      })),
   };
}

export async function addChapters(initialState: AddChaptersFormData, formData: FormData) {
   if (!initialState?.bookId || !initialState?.chapters?.length) {
      throw new Error('Received incorrect parameters or wrong type parameters');
   }
   const selectedChapters = formData.getAll('chapter');

   if (!selectedChapters?.length) {
      return {
         ...initialState,
         error: true,
         message: 'There are no chapters to add. Please select at least one',
      };
   }

   const chapters = initialState.chapters?.reduce(
      (list: Prisma.ChaptersCreateManyInput[], item: AddChaptersElement, index: number) => {
         if (!selectedChapters.includes(String(index))) {
            return list;
         }
         if (!item?.title?.trim()?.length || !item?.content?.trim()?.length) {
            return list;
         }
         return [...list, { title: item.title, content: item.content, bookId: initialState.bookId }];
      },
      []
   );

   if (!chapters?.length) {
      return {
         ...initialState,
         error: true,
         message: 'There are no chapters to add, or the selected chapters are missing content',
      };
   }

   await db.chapters.createMany({ data: chapters });

   revalidatePath(`/book/${initialState.bookId}`);
   redirect(`/book/${initialState.bookId}`);

   return { ...initialState };
}

export async function updateChapter(initialState: any, formData: FormData) {
   console.log('updateChapter', { initialState, formData });
   await new Promise(res => setTimeout(() => res(null), 1000));
   return initialState;
}

export async function processWithAI(formData: FormData) {
   const content = formData.get('content') as string;
   let characters: Character[] = [];
   try {
      characters = JSON.parse(formData.get('characters') as string);
   } catch (e) {}

   const lines = processColoredContent(content);

   // const request = breakContentToBaches(lines).map(requestHighlight);
   // const result = await Promise.all(request)
   const result = await new Promise(res => setTimeout(() => res(ai_result), 1000))
      .then(data => (data || []).map(item => processJSON(item)))
      .then(data => data.flat())
      .then(data => data.filter((value, index, self) => index === self.findIndex(t => t.text === value.text)));

   const highlightedContent = highlightContent(content, result, characters);

   return highlightedContent;
}
