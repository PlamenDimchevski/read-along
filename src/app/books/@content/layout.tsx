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
               <th></th>
               <th>Book</th>
               <th>Series</th>
               <th>Author</th>
               <th>Status</th>
               <th></th>
            </tr>
         </thead>
         <tbody>{children}</tbody>
      </table>
   );
}
