'use client';

import { bookStatusList } from '@/lib/constants';
import { BookCompleteData, BooksSuggestionsContent } from '@/types/books';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import Description from './description';
import { Loading } from './loading';

export default function BookForm({ data }: { data?: BookCompleteData }) {
   const { pending } = useFormStatus();
   const [suggestions, setSuggestions] = useState<BooksSuggestionsContent>({ book: [], series: [] });

   useEffect(() => {
      fetch('/books/api/suggestions')
         .then(response => response.json())
         .then(setSuggestions);
   }, []);

   if (pending) {
      return <Loading />;
   }

   return (
      <>
         <Description />
         <label className="input input-bordered flex items-center gap-2">
            Name
            <input type="text" name="name" className="grow" defaultValue={data?.name} required />
         </label>
         <label
            className={`input input-bordered flex items-center gap-2 ${!!data?.bookSeries?.author ? 'tooltip' : ''}`}
            data-tip="Note: Changes to the author will be ignored here. To update the author, please visit the Series page."
         >
            Author
            <input
               list="book-author-list"
               type="text"
               name="author"
               className="grow"
               defaultValue={data?.bookSeries?.author}
               required
               disabled={!!data?.bookSeries?.author}
            />
            <datalist id="book-author-list">
               {[...new Map(suggestions.series.map(item => [item['author'], item])).values()].map(item => (
                  <option key={item.id} value={item.author}></option>
               ))}
            </datalist>
         </label>

         <select className="select select-bordered w-full" name="status" defaultValue={data?.status || ''}>
            <option value="" disabled>
               Status
            </option>
            {Object.values(bookStatusList).map(item => (
               <option key={item.value} value={item.value}>
                  {item.title}
               </option>
            ))}
         </select>

         <label className="input input-bordered flex items-center gap-2">
            Book Series
            <input
               list="book-series-list"
               type="text"
               className="grow"
               name="series"
               defaultValue={data?.bookSeries?.name}
            />
            <kbd className="kbd kbd-xs hidden sm:inline-flex">Optional</kbd>
            <kbd className="kbd kbd-xs sm:hidden">*</kbd>
            <datalist id="book-series-list">
               {suggestions.series.map(item => (
                  <option key={item.id} value={item.name}></option>
               ))}
            </datalist>
         </label>
      </>
   );
}
