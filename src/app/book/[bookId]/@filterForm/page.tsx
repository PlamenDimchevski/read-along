'use client';
import { chaptersStatus } from '@/lib/constants';
import { QueryOptions } from '@/types/chapters';
import { ChapterStatus } from '@prisma/client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
export default function BooksForm({ params }: { params: { bookId: string } }) {
   const queryPrams = useSearchParams();
   const searchParams: QueryOptions = {
      q: queryPrams.get('q') || '',
      status: (queryPrams.get('status') as ChapterStatus) || '',
   };

   const route = useRouter();
   const reset = () => {
      route.push(`/book/${params.bookId}`);
      route.refresh();
   };

   return (
      <form className="flex flex-wrap justify-center gap-3">
         <div className="join">
            <label className="input join-item input-bordered flex items-center gap-2">
               <input
                  list="suggestion-list"
                  type="text"
                  className="grow"
                  placeholder="Search"
                  name="q"
                  defaultValue={searchParams.q}
               />
            </label>
            <select
               className="join-item select select-bordered hidden sm:inline-flex"
               defaultValue={searchParams.status}
               name="status"
            >
               <option disabled value="">
                  Status
               </option>
               {Object.values(chaptersStatus).map((item, index) => (
                  <option key={index} value={item.value}>
                     {item.title}
                  </option>
               ))}
            </select>
            <div className="indicator">
               {queryPrams.size > 0 && (
                  <button className="badge indicator-item" type="reset" onClick={reset}>
                     x
                  </button>
               )}
               <button type="submit" className="btn join-item btn-neutral">
                  Apply
               </button>
            </div>
         </div>

         <Link href="/books/add" className="btn btn-neutral" prefetch={true}>
            Add chapters
         </Link>
      </form>
   );
}
