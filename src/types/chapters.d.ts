import { ChapterProgress, ChapterStatus } from '@prisma/client';

export type QueryOptions = {
   q?: string;
   status?: ChapterStatus;
};
