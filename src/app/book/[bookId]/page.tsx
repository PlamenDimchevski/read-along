import { getBook } from '@/app/books/actions';
import { ChapterStatus } from '@prisma/client';

export default async function Book({ params }: { params: { bookId: string } }) {
   const bookData = await getBook(parseInt(params.bookId, 10));

   return (
      <div className="max-w-full">
         <h1 className="text-2xl font-bold">Books content</h1>
         <div className="stats mb-2 mt-2 w-full shadow">
            <div className="stat place-items-center">
               <div className="stat-title">Book Name</div>
               <div className="stat-desc">{bookData?.name}</div>
            </div>

            <div className="stat place-items-center">
               <div className="stat-title">Series name</div>
               <div className="stat-desc">{bookData?.bookSeries?.name}</div>
            </div>
            <div className="stat place-items-center">
               <div className="stat-title">Author</div>
               <div className="stat-desc">{bookData?.bookSeries?.author}</div>
            </div>

            <div className="stat place-items-center">
               <div className="stat-title">Read chapters</div>
               <div className="stat-value">
                  {bookData?.chapters.filter(item => item.status == ChapterStatus.READ).length}
               </div>
               <div className="stat-desc">in total {bookData?.chapters.length}</div>
            </div>
         </div>
      </div>
   );
}
