'use client';
import { QueryOptions } from '@/types/books';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
export default function BooksForm() {
   const queryPrams = useSearchParams();
   const searchParams: QueryOptions = {
      q: queryPrams.get('q') || '',
      order: queryPrams.get('order') as 'desc' | 'asc' | null,
      searchIn: queryPrams.get('searchIn') || 'all',
   };

   const route = useRouter();
   const reset = () => {
      route.push('/books');
      route.refresh();
   };

   console.log(searchParams);

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
               defaultValue={searchParams.searchIn}
               name="searchIn"
            >
               <option value="all">All</option>
               <option value="author">By author</option>
               <option value="book">Book Title</option>
               <option value="series">Series Title</option>
            </select>
            <select
               className="join-item select select-bordered hidden sm:inline-flex"
               defaultValue={searchParams.order || 'empty'}
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

         <Link href="/books/add" className="btn btn-neutral" prefetch={true}>
            Add new book
         </Link>
      </form>
   );
}
