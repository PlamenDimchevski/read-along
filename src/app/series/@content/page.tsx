import { QueryOptions } from '@/types/series';
import EllipsisVerticalIcon from '@heroicons/react/24/outline/esm/EllipsisVerticalIcon';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSeries } from '../actions';
import { bookStatusList } from '@/lib/constants';
import { Fragment } from 'react';
export default async function SeriesContent({ searchParams }: { searchParams: QueryOptions }) {
   const series = await getSeries(searchParams);

   if (!series.length) {
      notFound();
   }

   return (
      <>
         {series.map((item, index) => (
            <Fragment key={item.id}>
               <tr className="hover">
                  <td>{item.name}</td>
                  <td className="hidden sm:table-cell">{item.author}</td>
                  <td>{bookStatusList[item.status].title}</td>
                  <td className="hidden sm:table-cell">
                     <Link className="btn btn-sm" href={`/books?series=${item.id}`}>
                        {item._count.books}
                     </Link>
                  </td>
                  <td className="hidden sm:table-cell">
                     <Link className="btn btn-sm" href={`/books?series=${item.id}`}>
                        {item._count.character}
                     </Link>
                  </td>
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
                              <Link href={`/books?series=${item.id}`} prefetch={true}>
                                 View Books
                              </Link>
                           </li>
                           <li>
                              <Link href={`/books?series=${item.id}`} prefetch={true}>
                                 View Characters
                              </Link>
                           </li>
                           <li>
                              <Link href={`/series/${item.id}`} prefetch={true}>
                                 Edit
                              </Link>
                           </li>
                           <li>
                              <Link href={`/series/${item.id}/delete`} prefetch={true}>
                                 Delete
                              </Link>
                           </li>
                        </ul>
                     </div>
                  </td>
               </tr>
               <tr className="sm:hidden">
                  <th>Author</th>
                  <td colSpan={3}>{item.author}</td>
               </tr>
            </Fragment>
         ))}
      </>
   );
}
