'use client';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { filterBooks } from '../actions';
import BookContent from './bookContent';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { BooksType } from '@/types/books';

export default function BooksForm({ books, suggestionList }: { books: BooksType[]; suggestionList: string[] }) {
   const formRef = useRef<HTMLFormElement | null>(null);
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const hasFilter = searchParams.has('order') || searchParams.has('q');
   const [state, formAction] = useFormState(filterBooks, { books });
   const [order, setOrder] = useState(searchParams.get('order') || 'empty');
   const [searchIn, setSearchIn] = useState(searchParams.get('searchIn') || 'all');
   const [search, setSearch] = useState(searchParams.get('q') || '');

   const reset = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setOrder('empty');
      setSearch('');
      setSearchIn('all');

      router.push(`${pathname}`);
      setTimeout(() => {
         formRef.current?.requestSubmit();
      }, 0);
   };

   const submit = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const query = new URLSearchParams();
      if (order !== 'empty') {
         query.set('order', order);
      }
      if (search !== '') {
         query.set('q', search);
      }
      if (searchIn !== 'all') {
         query.set('searchIn', searchIn);
      }

      router.push(`${pathname}?${query.toString()}`);

      if (!query.toString()) {
         return;
      }

      formRef.current?.requestSubmit();
   };

   return (
      <form ref={formRef} action={formAction}>
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
                        {suggestionList.map((item: string, key: number) => (
                           <option key={key} value={item}></option>
                        ))}
                     </datalist>
                  </label>
                  <select
                     className="join-item select select-bordered"
                     defaultValue={searchIn}
                     name="searchIn"
                     onChange={e => setSearchIn(e.target.value)}
                  >
                     <option value="all">All</option>
                     <option value="author">By author</option>
                     <option value="book">Book Title</option>
                     <option value="series">Series Title</option>
                  </select>
                  <select
                     className="join-item select select-bordered"
                     defaultValue={order}
                     name="order"
                     onChange={e => setOrder(e.target.value)}
                  >
                     <option disabled value="empty">
                        Order
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
                     <button className="btn join-item btn-neutral" onClick={submit}>
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
