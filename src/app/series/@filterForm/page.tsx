'use client';
import { bookStatusList } from '@/lib/constants';
import { BookSorting } from '@/types/books';
import { QueryOptions } from '@/types/series';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
export default function BooksForm() {
   const queryPrams = useSearchParams();
   const searchParams: QueryOptions = {
      q: queryPrams.get('q') || '',
      order: (queryPrams.get('order') || 'empty') as BookSorting,
      status: null,
   };

   const route = useRouter();
   const reset = () => {
      route.push('/series');
      route.refresh();
   };

   return (
      <form className="flex flex-wrap justify-center gap-3">
         <div className="join">
            <label className="input join-item input-bordered flex items-center gap-2">
               <input type="text" className="grow" placeholder="Search" name="q" defaultValue={searchParams.q} />
            </label>
            <select
               className="join-item select select-bordered hidden sm:inline-flex"
               defaultValue={searchParams.status || ''}
               name="status"
            >
               <option disabled value="">
                  Status
               </option>
               {Object.values(bookStatusList).map(item => (
                  <option key={item.value} value={item.value}>
                     {item.title}
                  </option>
               ))}
            </select>
            <select
               className="join-item select select-bordered hidden sm:inline-flex"
               defaultValue={searchParams.order}
               name="order"
            >
               <option disabled value="empty">
                  Order
               </option>
               <option value="asc">Ascending</option>
               <option value="desc">Descending</option>
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

         <Link href="/series/add" className="btn btn-neutral" prefetch={true}>
            Add new series
         </Link>
      </form>
   );
}
