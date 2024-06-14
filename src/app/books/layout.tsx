import Link from 'next/link';

export default function RootLayout({
   modal,
   children,
}: Readonly<{
   modal: React.ReactNode;
   children: React.ReactNode;
}>) {
   return (
      <div className="min-h-screen bg-base-200">
         <header className="navbar bg-base-100">
            <div className="flex-1">
               <a className="btn btn-ghost text-xl">Book Club</a>
            </div>
            <nav className="flex-none">
               <ul className="menu menu-horizontal px-1">
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
            </nav>
         </header>
         <main className="flex grow justify-center">
            <div className="w-3/5">{children}</div>
         </main>
         {modal}
      </div>
   );
}
