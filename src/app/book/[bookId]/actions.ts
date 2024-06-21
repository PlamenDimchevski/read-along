import db from '@/lib/db';
import { QueryOptions } from '@/types/chapters';

export async function getChapters(id: number, searchParams: QueryOptions) {
   const query = searchParams.q;
   const status = searchParams.status || '';

   const chapters = await db.chapters.findMany({
      where: { bookId: id, title: { contains: query }, ...(!!status ? { status } : {}) },
      orderBy: { createdAt: 'desc' },
   });
   return chapters;
}
