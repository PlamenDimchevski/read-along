import { ChapterProgress, ChapterStatus } from '@prisma/client';

export type QueryOptions = {
   q?: string;
   status?: ChapterStatus;
};

export type AddChaptersElement = {
   title: string;
   content: string;
   exists: boolean;
};

export type AddChaptersFormData = {
   bookId: number;
   chapters?: AddChaptersElement[] | undefined;
   content?: string;
   error?: boolean;
   message?: string;
};
