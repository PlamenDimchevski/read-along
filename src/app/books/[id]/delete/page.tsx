import { BookCompleteData } from '@/types/books';
import { getBook } from '../../actions';
import DeleteBookForm from './form';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import { notFound } from 'next/navigation';

function BookSeriesDeletion({ bookData }: { bookData: BookCompleteData | null }) {
   const booksInSeries = bookData?.bookSeries?.books.length || 0;
   if (booksInSeries !== 1) {
      return null;
   }
   return (
      <>
         <div tabIndex={0} className="collapse collapse-open">
            <div className="collapse-title font-bold">
               <MinusCircleIcon className="mr-1 inline-block h-6 w-6 shrink-0 stroke-error" />
               As the only book in the series, it will delete the series as well
               <input type="hidden" value={bookData?.bookSeries?.id} name="seriesID" />
            </div>
         </div>
         <div className="divider"></div>
      </>
   );
}

function BookSeriesCharacterDeletion({ bookData }: { bookData: BookCompleteData | null }) {
   const charactersInSeries = bookData?.bookSeries?.character.length || 0;
   if (charactersInSeries === 0) {
      return null;
   }

   return (
      <>
         <div className="divider"></div>
         <div tabIndex={0} className="collapse collapse-arrow">
            <div className="collapse-title font-bold">
               <MinusCircleIcon className="mr-1 inline-block h-6 w-6 shrink-0 stroke-error" />
               This will also delete the following chapters {charactersInSeries}
            </div>
            <div className="collapse-content">
               <table className="table">
                  <tbody>
                     {bookData?.bookSeries?.character.map(item => (
                        <tr key={item.id}>
                           <td>
                              {item.name}
                              <input type="hidden" value={item.id} name="charactersIDs" />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </>
   );
}

export default async function DeleteBook({ params }: { params: { id: string } }) {
   const bookData = await getBook(parseInt(params.id, 10));
   if (!bookData) {
      notFound();
   }
   return (
      <DeleteBookForm>
         <article className="prose">
            <span className="text-gradient mb-4 text-base font-semibold uppercase sm:mb-2">
               Are you shure you want to delete this book
            </span>
            <h2 className="mb-10 text-3xl font-semibold sm:mb-6 sm:text-4xl">{bookData?.name}</h2>
            <span className="text-gradient mb-4 text-base font-semibold uppercase sm:mb-2">
               This book is part of series
            </span>
            <h2 className="mb-10 text-3xl font-semibold sm:mb-6 sm:text-4xl">{bookData?.bookSeries?.name}</h2>

            <BookSeriesDeletion bookData={bookData} />
            <div tabIndex={0} className="collapse collapse-arrow">
               <div className="collapse-title font-bold">
                  <MinusCircleIcon className="mr-1 inline-block h-6 w-6 shrink-0 stroke-error" />
                  This will also delete {bookData?.chapters.length} chapters
               </div>
               <div className="collapse-content">
                  <table className="table">
                     <tbody>
                        {bookData?.chapters.map(item => (
                           <tr key={item.id}>
                              <td>
                                 {item.title}
                                 <input type="hidden" value={item.id} name="chaptersIDs" />
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
            <BookSeriesCharacterDeletion bookData={bookData} />
            <input type="hidden" value={params.id} name="bookID" />
         </article>
      </DeleteBookForm>
   );
}
