'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Modal({ children, basePath }: { children: React.ReactNode; basePath: string }) {
   const pathname = usePathname();

   if (pathname === basePath) {
      return '';
   }

   return (
      <div>
         <dialog className="modal modal-open">
            <div className="modal-box w-11/12 max-w-5xl">
               <Link href={basePath} className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                  ✕
               </Link>

               {children}
            </div>
         </dialog>
      </div>
   );
}
