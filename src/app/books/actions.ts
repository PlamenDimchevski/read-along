'use server';

import db from '@/lib/db';
import { BooksType, QueryOptions } from '@/types/books';

export async function getTextsForSuggestions(): Promise<string[]> {
   try {
      const titles = await db.books.findMany({
         select: { name: true, bookSeries: { select: { name: true, author: true } } },
      });

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
