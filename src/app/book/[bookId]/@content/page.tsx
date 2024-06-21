import EllipsisVerticalIcon from '@heroicons/react/24/outline/esm/EllipsisVerticalIcon';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getChapters } from '../actions';
import { QueryOptions } from '@/types/chapters';
import { chapterProgress, chaptersStatus } from '@/lib/constants';
export default async function BookContent({
   params,
   searchParams,
}: {
   params: { bookId: string };
   searchParams: QueryOptions;
}) {
   const chapters = await getChapters(parseInt(params.bookId, 10), searchParams);

   if (!chapters.length) {
      notFound();
   }

   return (
      <>
         {chapters.map((item, index: number) => (
            <tr className="hover" key={item.id}>
               <th>{index + 1}</th>
               <td>{item.title}</td>
               <td>{chaptersStatus[item.status].title}</td>
               <td>{chapterProgress[item.progress].title}</td>
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
                     </ul>
                  </div>
               </td>
            </tr>
         ))}
      </>
   );
}
