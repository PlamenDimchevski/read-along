import { BooksType, QueryOptions } from '@/types/books';
import EllipsisVerticalIcon from '@heroicons/react/24/outline/esm/EllipsisVerticalIcon';
import Link from 'next/link';
import { getBooks } from '../actions';
import { notFound } from 'next/navigation';
import { bookStatusList } from '@/lib/constants';
export default async function BookContent({ searchParams }: { searchParams: QueryOptions }) {
   const books = await getBooks(searchParams);

   if (!books.length) {
      notFound();
   }

   return (
      <>
         {books.map((item: BooksType, index: number) => (
            <tr className="hover" key={item.id}>
               <th>{item.id}</th>
               <td>{item.name}</td>
               <td className="hidden sm:table-cell">{item.bookSeries?.name}</td>
               <td className="hidden sm:table-cell">{item.bookSeries?.author}</td>
               <td>{bookStatusList[item.status].title}</td>
               <td>
                  <div className="dropdown dropdown-end">
                     <div tabIndex={index} role="button" className="btn m-1">
                        <EllipsisVerticalIcon className="size-6" />
                     </div>
                     <ul
                        tabIndex={index}
                        className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
                     >
                        <li>
                           <Link href={`/book/${item.id}`} prefetch={true}>
                              Open
                           </Link>
                        </li>
                        <li>
                           <Link href={`/books/${item.id}`} prefetch={true}>
                              Edit
                           </Link>
                        </li>
                        <li>
                           <Link href={`/books/${item.id}/delete`} prefetch={true}>
                              Delete
                           </Link>
                        </li>
                        <li>
                           <Link href={`/book/${item.id}/add`} prefetch={true}>
                              Add chapters
                           </Link>
                        </li>
                     </ul>
                  </div>
               </td>
            </tr>
         ))}
      </>
   );
}
