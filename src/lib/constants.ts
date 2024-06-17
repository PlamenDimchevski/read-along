import { BookFormData } from '@/types/books';
import { BookStatus } from '@prisma/client';

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
