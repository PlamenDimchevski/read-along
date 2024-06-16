import BooksForm from './components/booksForm';
import { getBooks } from './actions';
import { BooksType, QueryOptions } from '@/types/books';

function getBooksTitlesForFormSuggestions(books: BooksType[]): string[] {
   return Array.from(
      new Set(
         books.reduce(
            (list: string[], item: any) => [...list, item.name, item.bookSeries?.name, item.bookSeries?.author],
            []
         )
      )
   );
}

export default async function BooksList({ searchParams }: { searchParams: QueryOptions }) {
   const books = await getBooks(searchParams);
   const suggestionList = getBooksTitlesForFormSuggestions(books);

   return (
      <div className="flex w-full flex-col">
         <BooksForm books={books} suggestionList={suggestionList} />
      </div>
   );
}
