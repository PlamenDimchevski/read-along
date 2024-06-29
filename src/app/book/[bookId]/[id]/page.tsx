import { chapterProgress, chaptersStatus } from '@/lib/constants';
import { getChapter, updateChapter } from '../actions';
import { ChapterContent } from './content';

export default async function EditChapter({ params }: { params: { bookId: string; id: string } }) {
   const chapter = await getChapter(parseInt(params.bookId, 10), parseInt(params.id, 10));

   return (
      <form action={updateChapter} className="flex flex-col gap-4">
         <h2 className="text-lg font-bold">Edit chapter</h2>
         <label className="input input-bordered flex items-center gap-2">
            Chapter name
            <input type="text" name="name" className="grow" defaultValue={chapter?.title} required />
         </label>
         <ChapterContent content={chapter?.content} characters={chapter?.book.bookSeries?.character} />
         <div className="grid gap-2 sm:grid-flow-col">
            <select className="select select-bordered" name="status" defaultValue={chapter?.status || ''}>
               <option value="" disabled>
                  Status
               </option>
               {Object.values(chaptersStatus).map(item => (
                  <option key={item.value} value={item.value}>
                     {item.title}
                  </option>
               ))}
            </select>
            <select className="select select-bordered" name="status" defaultValue={chapter?.progress || ''}>
               <option value="" disabled>
                  Progress
               </option>
               {Object.values(chapterProgress).map(item => (
                  <option key={item.value} value={item.value}>
                     {item.title}
                  </option>
               ))}
            </select>
            <button className="btn btn-neutral">Process with AI</button>
         </div>
         <div className="modal-action">
            <button type="submit" className="btn btn-primary">
               Save
            </button>
         </div>
      </form>
   );
}
