import Link from 'next/link';

export default function Books() {
   return (
      <div className="overflow-x-auto">
         <table className="table">
            {/* head */}
            <thead>
               <tr>
                  <th></th>
                  <th>Book</th>
                  <th>Series</th>
                  <th>Author</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {/* row 1 */}
               <tr className="hover">
                  <th>1</th>
                  <td>Ascendance of a Bookworm Part 1 Volume 1</td>
                  <td>Ascendance of a Bookworm</td>
                  <td>Miya Kazuki</td>
                  <td>
                     <a>Open</a>
                     <Link href="/books/1" className="btn btn-ghost btn-xs" prefetch={true}>
                        Edit
                     </Link>
                     <Link href="/books/1/delete" className="btn btn-ghost btn-xs" prefetch={true}>
                        Delete
                     </Link>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   );
}
