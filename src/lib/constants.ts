import { BookFormData } from '@/types/books';
import { BookStatus, ChapterProgress, ChapterStatus } from '@prisma/client';

const fieldError = { error: false, message: null };

export const bookFormData: BookFormData = {
   message: '',
   status: true,
   success: false,
   data: { name: '', author: '', status: BookStatus.ONGOING, series: '', content: '' },
   errors: { name: fieldError, author: fieldError, status: fieldError, series: fieldError, content: fieldError },
};

export const bookStatusList = {
   [BookStatus.CANCELED]: {
      value: BookStatus.CANCELED,
      title: 'Canceled',
   },
   [BookStatus.COMPLETED]: {
      value: BookStatus.COMPLETED,
      title: 'Completed',
   },
   [BookStatus.ONGOING]: {
      value: BookStatus.ONGOING,
      title: 'Ongoing',
   },
};

export const chaptersStatus = {
   [ChapterStatus.OPEN]: {
      value: ChapterStatus.OPEN,
      title: 'Open',
   },
   [ChapterStatus.READ]: {
      value: ChapterStatus.READ,
      title: 'Is read',
   },
   [ChapterStatus.READING]: {
      value: ChapterStatus.READING,
      title: 'Currently reading',
   },
};

export const chapterProgress = {
   [ChapterProgress.ADDED]: {
      value: ChapterProgress.ADDED,
      title: 'Just Added',
   },
   [ChapterProgress.APPROVED]: {
      value: ChapterProgress.APPROVED,
      title: "It's approved",
   },
   [ChapterProgress.PROCESSING]: {
      value: ChapterProgress.PROCESSING,
      title: 'AI Processing',
   },
   [ChapterProgress.READY]: {
      value: ChapterProgress.READY,
      title: 'Ready',
   },
};
