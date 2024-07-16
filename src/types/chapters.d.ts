import { ChapterProgress, ChapterStatus, Prisma } from '@prisma/client';

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

export type ChapterCompleteData = Prisma.ChaptersGetPayload<{
   where: { id: chapterId; bookId };
   select: {
      id: true;
      title: true;
      content: true;
      status: true;
      progress: true;
      aiProcessed: true;
      book: { select: { name: true; id: true; bookSeries: { select: { id: true; character: true } } } };
   };
}> | null;
