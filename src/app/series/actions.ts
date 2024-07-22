'use server';
import db from '@/lib/db';
import { QueryOptions, SeriesFormData } from '@/types/series';
import { BookStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getSeries(searchParams: QueryOptions) {
   const query = searchParams.q;
   const status = searchParams.status;
   const order = searchParams.order !== 'empty' ? searchParams.order : 'desc';

   const series = await db.bookSeries.findMany({
      where: {
         ...(query?.length
            ? {
                 OR: [
                    {
                       name: {
                          contains: query,
                       },
                    },
                    {
                       author: {
                          contains: query,
                       },
                    },
                 ],
              }
            : {}),

         ...(status ? { status: { equals: status } } : {}),
      },
      orderBy: { createdAt: order || 'desc' },
      include: { _count: { select: { books: true, character: true } } },
   });

   return series;
}

export async function getSeriesData(id: number) {
   return await db.bookSeries.findUnique({
      where: { id },
      include: { _count: { select: { books: true, character: true } } },
   });
}

export async function manageSeries(initialState: SeriesFormData | undefined, formData: FormData) {
   const id = Number(formData.get('id'));
   const name = String(formData.get('name'));
   const author = String(formData.get('author'));
   const status = String(formData.get('status')) as BookStatus;

   if (!name) {
      return { data: { name, author, status, id }, error: true, message: 'Please fill series name filed' };
   }

   if (!author) {
      return { data: { name, author, status, id }, error: true, message: 'Please fill series author filed' };
   }

   if (!status) {
      return { data: { name, author, status, id }, error: true, message: 'Please select series status' };
   }

   const checkName = await db.bookSeries.findFirst({ where: { name: { equals: name.trim() } } });
   if (checkName) {
      return {
         data: { name, author, status, id },
         error: true,
         message: 'This series name already exists',
      };
   }

   await db.bookSeries.upsert({
      where: { id: id },
      update: { status: status, name: name.trim(), author: author.trim() },
      create: { status: status, name: name.trim(), author: author.trim() },
   });

   revalidatePath('/series');
   redirect('/series');

   return { data: { name, author, status, id }, error: false, message: '' };
}

export async function deleteSeries(formData: FormData) {
   if (!formData?.has('seriesID')) {
      throw new Error('Received incorrect parameters or wrong type parameters');
   }

   const transactionList = [];
   const seriesID = Number(formData.get('seriesID'));

   if (!seriesID) {
      throw new Error("Couldn't find series Id for deletion.");
   }

   const booksList = (await db.books.findMany({ where: { bookSeriesId: seriesID }, select: { id: true } })).map(
      item => item.id
   );

   const deletingChapters = db.chapters.deleteMany({
      where: { bookId: { in: booksList } },
   });
   const deletingCharacter = db.character.deleteMany({ where: { bookSeriesId: seriesID } });
   const deletingBook = db.books.deleteMany({ where: { bookSeriesId: seriesID } });
   const deletingSeries = db.bookSeries.delete({ where: { id: seriesID } });

   transactionList.push(deletingCharacter);
   transactionList.push(deletingChapters);
   transactionList.push(deletingBook);
   transactionList.push(deletingSeries);

   await db.$transaction(transactionList);

   revalidatePath('/books');
   revalidatePath('/book');
   revalidatePath('/series');
   redirect('/series');
}
