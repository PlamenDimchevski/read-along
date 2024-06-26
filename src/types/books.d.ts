import { BookStatus, Prisma } from '@prisma/client';

export type BooksType = Prisma.BooksGetPayload<{ include: { bookSeries: true } }>;

export type BookSorting = Prisma.SortOrder | 'empty';
export type BookSearch = 'all' | 'author' | 'book' | 'series';

export type QueryOptions = { q?: string; order?: Prisma.SortOrder | 'empty'; searchIn?: string };

export type BooksSuggestion = Prisma.BooksGetPayload<{
   select: { name: true; id: true; bookSeries: { select: { id: true; name: true; author: true } } };
}>;

export type BookCompleteData = Prisma.BooksGetPayload<{
   where: { id: { equals: id } };
   select: {
      id: true;
      name: true;
      status: true;
      bookSeries: {
         select: {
            id: true;
            name: true;
            author: true;
            books: { select: { id: true; name: true } };
            character: { select: { id: true; name: true; status: true } };
         };
      };
      chapters: { select: { id: true; title: true } };
   };
}> | null;

export type BooksSuggestionsContent = {
   book: { id: number | undefined; name: string | undefined }[];
   series: { id: number | undefined; name: string | undefined; author: string | undefined }[];
};

type FieldError = {
   error: boolean;
   message: string | null;
};

export type BookFormFieldErrors = {
   name: FieldError;
   author: FieldError;
   status: FieldError;
   series: FieldError;
   content?: FieldError;
};

export type BookFormData = {
   message: string;
   status: boolean;
   success: boolean;
   data: {
      id?: number;
      seriesId?: number;
      name: string;
      author: string;
      status: BookStatus;
      series: string;
      content?: string;
   };
   content?: BookCompleteData;
   errors: BookFormFieldErrors;
};
