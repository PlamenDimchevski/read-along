import { getChapter } from '../actions';
import ChapterForm from './form';

export default async function EditChapter({ params }: { params: { bookId: string; id: string } }) {
   const chapter = await getChapter(parseInt(params.bookId, 10), parseInt(params.id, 10));

   return (
      <ChapterForm chapter={chapter} params={params}>
         <h2 className="text-lg font-bold">Edit chapter</h2>
         <label className="input input-bordered flex items-center gap-2">
            Chapter name
            <input type="text" name="name" className="grow" defaultValue={chapter?.title} required />
         </label>
      </ChapterForm>
   );
}
