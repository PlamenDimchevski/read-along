'use client';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { filterBooks } from '../actions';
import BookContent from './bookContent';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';

export default function BooksForm({ books, suggestionList }: any) {
   const formRef = useRef<HTMLFormElement | null>(null);
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const hasFilter = searchParams.has('f') || searchParams.has('q');
   const [state, formAction] = useFormState(filterBooks, { books });
   const [order, setOrder] = useState(searchParams.get('f') || 'empty');
   const [search, setSearch] = useState(searchParams.get('q') || '');

   const reset = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setOrder('empty');
      setSearch('');
      formRef.current?.requestSubmit();
   };

   const onSubmit = () => {
      const query = new URLSearchParams();
      if (order !== 'empty') {
         query.set('f', order);
      }
      if (search !== '') {
         query.set('q', search);
      }
      if (query) {
         return router.push(`${pathname}?${query}`);
      }
      console.log('call');
      router.push(`${pathname}`);
   };

   return (
      <form ref={formRef} action={formAction} onSubmit={onSubmit}>
         <div className="card grid h-20 place-items-center">
            <div className="flex">
               <div className="join">
                  <label className="input join-item input-bordered flex items-center gap-2">
                     <input
                        list="suggestion-list"
                        type="text"
                        className="grow"
                        placeholder="Search"
                        name="q"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                     />
                     <datalist id="suggestion-list">
                        {suggestionList.map((item: any, key: number) => (
                           <option key={key} value={item}></option>
                        ))}
                     </datalist>
                  </label>
                  <select
                     className="join-item select select-bordered"
                     defaultValue={order}
                     name="f"
                     onChange={e => setOrder(e.target.value)}
                  >
                     <option disabled value="empty">
                        Filter
                     </option>
                     <option value="asc">Ascending</option>
                     <option value="desc">Descending</option>
                  </select>
                  <div className="indicator">
                     {hasFilter && (
                        <button value="clear" className="badge indicator-item" onClick={reset}>
                           x
                        </button>
                     )}
                     <button type="submit" className="btn join-item btn-neutral">
                        Apply
                     </button>
                  </div>
               </div>

               <Link href="/books/add" className="btn btn-neutral ml-3" prefetch={true}>
                  Add new book
               </Link>
            </div>
         </div>
         <div className="divider"></div>
         <div className="grid">
            <table className="table">
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
               <BookContent books={state.books} />
            </table>
         </div>
      </form>
   );
}
