'use client';

import { ChapterCompleteData } from '@/types/chapters';
import { processWithAI, updateChapter } from '../actions';
import { chapterProgress, chaptersStatus } from '@/lib/constants';
import { useFormState } from 'react-dom';
import { ChapterContent } from './content';
import { useRef, useState } from 'react';

export default function ChapterForm({
   children,
   chapter,
   params,
}: {
   children: React.ReactNode;
   chapter: ChapterCompleteData;
   params: { bookId: string; id: string };
}) {
   const contentForm = useRef<HTMLFormElement>(null);
   const [state, formAction] = useFormState(updateChapter, { chapter, params });
   const [content, setContent] = useState(chapter?.content);
   const [aiProcessing, setAiProcessing] = useState(false);
   return (
      <form ref={contentForm} action={formAction} className="flex flex-col gap-4">
         {children}
         {aiProcessing && (
            <div className="fixed inset-0 z-10 flex place-content-center place-items-center bg-slate-400 bg-opacity-35">
               <div className="card h-max bg-base-100 shadow-xl lg:card-side">
                  <div className="card-body">
                     <p>This might take several minutes, please be patient</p>
                     <span className="loading loading-dots loading-lg"></span>
                  </div>
               </div>
            </div>
         )}
         <ChapterContent content={content} characters={chapter?.book.bookSeries?.character} />
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
            <button
               type="button"
               className="btn btn-neutral"
               onClick={async e => {
                  setAiProcessing(true);
                  const formData = new FormData(contentForm?.current || undefined);
                  formData.append('processWithAi', '1');
                  formData.append('characters', JSON.stringify(chapter?.book.bookSeries?.character));
                  const newContent = await processWithAI(formData);
                  setContent(newContent);
                  setAiProcessing(false);
               }}
            >
               Process with AI
            </button>
         </div>
         <div className="modal-action">
            <button type="submit" className="btn btn-primary">
               Save
            </button>
         </div>
      </form>
   );
}
