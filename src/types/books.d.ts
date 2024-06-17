import { BookStatus, Prisma } from '@prisma/client';

export type BooksType = Prisma.BooksGetPayload<{ include: { bookSeries: true } }>;

export type BookSorting = Prisma.SortOrder | 'empty';
export type BookSearch = 'all' | 'author' | 'book' | 'series';

export type QueryOptions = { q?: string; order?: Prisma.SortOrder | 'empty'; searchIn?: string };

export type BooksSuggestion = Prisma.BooksGetPayload<{
   select: { name: true; id: true; bookSeries: { select: { id: true; name: true; author: true } } };
}>;

export type ProcessedContent = {
   title: string;
   content: string;
};

export type BooksSuggestionsContent = {
   author: string[];
   book: string[];
   series: string[];
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
      name: string;
      author: string;
      status: BookStatus;
      series: string;
      content?: string;
   };
   errors: BookFormFieldErrors;
};
