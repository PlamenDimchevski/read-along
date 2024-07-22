import { Prisma, BookStatus } from '@prisma/client';

export type QueryOptions = { q?: string; order?: Prisma.SortOrder | 'empty'; status?: BookStatus | null };
export type SeriesFormData = {
   data: { id?: number; name: string; author: string; status: BookStatus };
   error?: boolean;
   message?: string;
};
