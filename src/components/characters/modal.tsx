'use client';
import { useRef } from 'react';

export function Modal({ children }: { children: React.ReactNode }) {
   const dialog = useRef<HTMLDialogElement | null>(null);
   const closeDialog = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      dialog.current?.close();
   };

   return (
      <div>
         <dialog className="modal modal-open" ref={dialog}>
            <div className="modal-box w-11/12 max-w-5xl">
               <span onClick={closeDialog} className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                  ✕
               </span>

               {children}
            </div>
         </dialog>
      </div>
   );
}
