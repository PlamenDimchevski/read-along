'use client';

import React, { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { deleteBook } from '../../actions';

function ProcessingDeletion({ closeModal }: { closeModal: (event: React.MouseEvent<HTMLElement>) => void }) {
   const { pending } = useFormStatus();
   if (pending) {
      return (
         <div className="flex w-full place-content-center">
            <span className="loading loading-dots loading-lg min-w-24"></span>
         </div>
      );
   }

   return (
      <>
         <h3 className="text-lg font-bold">Are you shure</h3>
         <p className="py-4">This will permanently delete the content</p>
         <div className="modal-action">
            <button className="btn btn-primary" onClick={closeModal}>
               close
            </button>
            <button type="submit" className="btn btn-error">
               Yes
            </button>
         </div>
      </>
   );
}

export default function DeleteBookForm({ children }: Readonly<{ children: React.ReactNode }>) {
   const confirmation = useRef<HTMLDialogElement | null>(null);
   const [state, formAction] = useFormState(deleteBook, null);
   const closeModal = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      confirmation.current?.close();
   };
   return (
      <>
         <form action={formAction}>
            <div className="flex flex-col gap-4">
               {children}
               <div className="modal-action">
                  <button
                     className="btn btn-error"
                     onClick={(event: React.MouseEvent<HTMLElement>) => {
                        event.preventDefault();
                        confirmation.current?.showModal();
                     }}
                  >
                     Yes
                  </button>
               </div>
            </div>
            <dialog
               ref={confirmation}
               id="delete_button_conformation_dialog"
               className="modal modal-bottom sm:modal-middle"
            >
               <div className="modal-box">
                  <ProcessingDeletion closeModal={closeModal} />
               </div>
            </dialog>
         </form>
      </>
   );
}
