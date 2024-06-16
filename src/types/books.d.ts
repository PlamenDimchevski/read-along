import { Prisma } from '@prisma/client';

export type BooksType = Prisma.BooksGetPayload<{ include: { bookSeries: true } }>;

export type QueryOptions = { q?: string; order?: 'desc' | 'asc' | null; searchIn?: string };
