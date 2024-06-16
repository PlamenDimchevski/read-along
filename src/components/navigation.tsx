import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Bars4Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Navigation() {
   return (
      <header className="navbar bg-base-100">
         <div className="flex-none sm:hidden">
            <div className="dropdown">
               <div tabIndex={0} role="button" className="btn btn-square btn-ghost m-1">
                  <Bars4Icon className="inline-block h-5 w-5 stroke-current" />
               </div>
               <ul tabIndex={0} className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
                  <li>
                     <a>Books</a>
                  </li>
                  <li>
                     <a>Books Series</a>
                  </li>
                  <li>
                     <a>Help</a>
                  </li>
               </ul>
            </div>
         </div>
         <div className="flex-1">
            <a className="btn btn-ghost text-xl">Book Club</a>
         </div>
         <nav className="flex-none">
            <ul className="menu menu-horizontal hidden px-1 sm:inline-flex">
               <li>
                  <a>Books</a>
               </li>
               <li>
                  <a>Books Series</a>
               </li>
               <li>
                  <a>Help</a>
               </li>
               <li>
                  <details>
                     <summary>Actions</summary>
                     <ul className="rounded-t-none bg-base-100 p-2">
                        <li>
                           <Link href="/books/add" className="btn btn-ghost btn-xs" prefetch={true}>
                              Add book
                           </Link>
                        </li>
                        <li>
                           <a>Currently read</a>
                        </li>
                        <li>
                           <a>Logout</a>
                        </li>
                     </ul>
                  </details>
               </li>
            </ul>
            <div className="flex-none sm:hidden">
               <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-square btn-ghost m-1">
                     <EllipsisVerticalIcon className="sinline-block h-5 w-5 stroke-current" />
                  </div>
                  <ul tabIndex={0} className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
                     <ul className="rounded-t-none bg-base-100 p-2">
                        <li>
                           <Link href="/books/add" className="btn btn-ghost btn-xs" prefetch={true}>
                              Add book
                           </Link>
                        </li>
                        <li>
                           <a>Currently read</a>
                        </li>
                        <li>
                           <a>Logout</a>
                        </li>
                     </ul>
                  </ul>
               </div>
            </div>
         </nav>
      </header>
   );
}
