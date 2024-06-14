'use client';

import { useRouter } from 'next/navigation';

export default function Modal({ children }: { children: React.ReactNode }) {
   const router = useRouter();
   return (
      <div>
         <dialog className="modal modal-open">
            <div className="modal-box w-11/12 max-w-5xl">
               <button
                  className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                  onClick={() => {
                     router.back();
                  }}
               >
                  ✕
               </button>

               {children}
            </div>
         </dialog>
      </div>
   );
}
