export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <table className="table h-fit">
         {/* head */}
         <thead>
            <tr>
               <th>Name</th>
               <th className="hidden sm:table-cell">Author</th>
               <th>Status</th>
               <th className="hidden sm:table-cell">Books</th>
               <th className="hidden sm:table-cell">Characters</th>
               <th></th>
            </tr>
         </thead>
         <tbody>{children}</tbody>
      </table>
   );
}
