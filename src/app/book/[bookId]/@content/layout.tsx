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
               <th>Name</th>
               <th>Status</th>
               <th>Progress</th>
               <th></th>
            </tr>
         </thead>
         <tbody>{children}</tbody>
      </table>
   );
}
