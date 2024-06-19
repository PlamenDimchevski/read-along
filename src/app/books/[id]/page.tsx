import { notFound } from 'next/navigation';
import { getBook } from '../actions';
import BookForm from '../components/form';
import EditBookForm from './form';
import { bookFormData } from '@/lib/constants';
import { BookFormData } from '@/types/books';

export default async function EditBook({ params }: { params: { id: string } }) {
   const bookData = await getBook(parseInt(params.id, 10));

   if (!bookData) {
      notFound();
   }

   const formData: BookFormData = {
      ...bookFormData,
      content: bookData,
      data: {
         id: bookData.id,
         seriesId: bookData.bookSeries?.id,
         name: bookData?.name,
         author: bookData?.bookSeries?.author || '',
         status: bookData.status,
         series: bookData.bookSeries?.name || '',
      },
   };

   return (
      <EditBookForm formData={formData}>
         <h3 className="text-lg font-bold">Edit book</h3>
         <BookForm data={bookData} />
         <div tabIndex={0} className="collapse collapse-arrow">
            <div className="collapse-title font-bold">
               Book chapters <div className="badge badge-outline">{bookData?.chapters.length}</div>
            </div>
            <div className="collapse-content">
               <table className="table">
                  <tbody>
                     {bookData?.chapters.map(item => (
                        <tr key={item.id}>
                           <td>{item.title}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </EditBookForm>
   );
}
