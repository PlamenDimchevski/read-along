'use server';

import db from '@/lib/db';
import { BooksActions, BooksType, QueryOptions } from '@/types/books';

export async function getBooks(searchParams: QueryOptions): Promise<BooksType[]> {
   const query = searchParams.q;
   const order = searchParams.order;
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

export async function filterBooks(previousData: BooksActions, formData: FormData): Promise<BooksActions> {
   const queryParameters: QueryOptions = {
      q: formData.get('q') as string,
      order: formData.get('order') as 'desc' | 'asc' | null,
      searchIn: formData.get('searchIn') as string,
   };
   const books = await getBooks(queryParameters);
   return { books };
}
