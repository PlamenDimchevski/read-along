'use client';
import { BooksType } from '@/types/books';
import EllipsisVerticalIcon from '@heroicons/react/24/outline/esm/EllipsisVerticalIcon';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
export default function BookContent({ books }: { books: BooksType[] }) {
   const { pending } = useFormStatus();

   if (pending) {
      return (
         <tbody>
            <tr>
               <td colSpan={6}>
                  <div className="flex w-full flex-col gap-4">
                     <div className="skeleton h-10 w-full"></div>
                     <div className="skeleton h-10 w-full"></div>
                  </div>
               </td>
            </tr>
         </tbody>
      );
   }

   return (
      <tbody>
         {books.map((item: BooksType, index: number) => (
            <tr className="hover" key={item.id}>
               <th>{item.id}</th>
               <td>{item.name}</td>
               <td>{item.bookSeries?.name}</td>
               <td>{item.bookSeries?.author}</td>
               <td>{item.status}</td>
               <td>
                  <div className="dropdown dropdown-hover">
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
      </tbody>
   );
}
