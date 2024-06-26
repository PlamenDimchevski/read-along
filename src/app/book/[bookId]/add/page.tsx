'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { addChapters, processChaptersForAdding } from '../actions';
import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import React, { useRef, useState } from 'react';
import { AddChaptersElement } from '@/types/chapters';

function WarningForChapterOvertiring() {
   return (
      <div role="alert" className="alert">
         <InformationCircleIcon className="h-6 w-6 shrink-0 stroke-info" />
         <div>
            <h3 className="font-bold">Note: Adding chapters with existing names will result in duplicates.</h3>
            <div className="text-xs">Chapters are identified by name only.</div>
         </div>
      </div>
   );
}

function ErrorMessaging({ hasError, message }: { hasError: boolean | undefined; message: string | undefined }) {
   if (!hasError) {
      return null;
   }

   return (
      <div role="alert" className="alert alert-warning">
         <ExclamationTriangleIcon className="h-6 w-6 shrink-0 stroke-current" />
         <div>
            <h3 className="font-bold">Warning! Please review</h3>
            <div className="text-xs">{message}</div>
         </div>
      </div>
   );
}

function ContentElement({ content }: { content: string }) {
   const { pending } = useFormStatus();
   if (pending) {
      return <div className="skeleton h-52 w-full"></div>;
   }
   return (
      <textarea
         name="content"
         required
         className="textarea textarea-bordered min-h-52"
         placeholder="Chapters Content"
         defaultValue={content}
      ></textarea>
   );
}

function ChaptersList({
   chapters,
   checkboxChapters,
}: {
   chapters: AddChaptersElement[];
   checkboxChapters: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
   const { pending } = useFormStatus();
   if (pending) {
      return (
         <ul>
            {chapters.map((item, key) => (
               <li key={key}>
                  <div className="skeleton h-12 w-full"></div>
                  <div className="divider"></div>
               </li>
            ))}
         </ul>
      );
   }
   return (
      <ul>
         {chapters.map((item, key) => (
            <li key={key}>
               <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-8">
                     <input
                        data-exists={Number(item?.exists)}
                        type="checkbox"
                        className="checkbox"
                        name="chapter"
                        defaultValue={key}
                        defaultChecked={!item?.exists}
                        onChange={checkboxChapters}
                     />
                     <span className="label-text">
                        {item?.title}
                        {!item?.exists || (
                           <div className="badge badge-warning gap-2">Chapter with this name already exists</div>
                        )}
                     </span>
                  </label>
                  <div className="divider"></div>
               </div>
            </li>
         ))}
      </ul>
   );
}

function ChaptersElements({ chapters, bookId }: { chapters: AddChaptersElement[]; bookId: number }) {
   const [state, formAction] = useFormState(addChapters, { bookId, chapters });
   const [showWarning, setShowWarning] = useState(false);
   const existingChapters = useRef(new Set());

   const checkboxChapters = (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      const isExisting = parseInt(event.target.dataset.exists as string, 10);
      const key = event.target.value;

      if (!isChecked) {
         existingChapters.current.delete(key);
      }

      if (isChecked && isExisting) {
         existingChapters.current.add(key);
      }

      setShowWarning(Boolean(existingChapters.current.size));
   };

   return (
      <form action={formAction} className="flex flex-col gap-4">
         <ErrorMessaging hasError={state?.error} message={state?.message} />
         <h2 className="text-lg font-bold">Add chapters</h2>
         <p>You can select which chapters to add.</p>
         {!showWarning || <WarningForChapterOvertiring />}
         <ChaptersList chapters={chapters} checkboxChapters={checkboxChapters} />
         <div className="modal-action">
            <button type="submit" className="btn btn-primary">
               Save
            </button>
         </div>
      </form>
   );
}

export default function AddChapters({ params }: { params: { bookId: string } }) {
   const [state, formAction] = useFormState(processChaptersForAdding, { bookId: parseInt(params.bookId, 10) });
   if (state?.chapters?.length && !state?.error) {
      return <ChaptersElements chapters={state?.chapters || []} bookId={parseInt(params.bookId, 10)} />;
   }
   return (
      <form action={formAction} className="flex flex-col gap-4">
         <ErrorMessaging hasError={state?.error} message={state?.message} />
         <h2 className="text-lg font-bold">Add chapters</h2>
         <p>
            Paste HTML content for the chapters, and it will automatically be divided into separate chapters with their
            titles and content.
            <br />
            For more information see the help page
         </p>
         <ContentElement content={state?.content || ''} />
         <div className="modal-action">
            <button type="submit" className="btn btn-primary">
               Save
            </button>
         </div>
      </form>
   );
}
