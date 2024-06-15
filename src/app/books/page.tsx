import db from '@/lib/db';
import BooksForm from './components/booksForm';

function getBooksTitlesForFormSuggestions(books: any): string[] {
   return books.reduce(
      (list: string[], item: any) => [...list, item.name, item.bookSeries?.name, item.bookSeries?.author],
      []
   );
}

export default async function BooksList() {
   const books = await db.books.findMany({ orderBy: { createdAt: 'desc' }, include: { bookSeries: true } });
   const suggestionList = getBooksTitlesForFormSuggestions(books);

   return (
      <div className="flex w-full flex-col">
         <BooksForm books={books} suggestionList={suggestionList} />
      </div>
   );
}
