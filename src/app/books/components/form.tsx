'use client';

import { bookStatusList } from '@/lib/constants';
import { BooksSuggestionsContent } from '@/types/books';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
function Description() {
   return (
      <p className="py-4">
         If the book name and the series name are the same, you can leave this field empty. If left empty, it will
         automatically be filled with the book name upon saving.
      </p>
   );
}

function Loading() {
   return (
      <>
         <Description />
         <div className="skeleton h-12 w-full"></div>
         <div className="skeleton h-12 w-full"></div>
         <div className="skeleton h-12 w-full"></div>
         <div className="skeleton h-12 w-full"></div>
      </>
   );
}

export default function BookForm() {
   const { pending } = useFormStatus();
   const [suggestions, setSuggestions] = useState<BooksSuggestionsContent>({ author: [], book: [], series: [] });

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
            <input type="text" name="name" className="grow" required />
         </label>
         <label className="input input-bordered flex items-center gap-2">
            Author
            <input list="book-author-list" type="author" name="author" className="grow" required />
            <datalist id="book-author-list">
               {suggestions.author.map((item, key) => (
                  <option key={key} value={item}></option>
               ))}
            </datalist>
         </label>

         <select className="select select-bordered w-full" name="status" defaultValue="">
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
            <input list="book-series-list" type="text" className="grow" name="series" />
            <kbd className="kbd kbd-xs hidden sm:inline-flex">Optional</kbd>
            <kbd className="kbd kbd-xs sm:hidden">*</kbd>
            <datalist id="book-series-list">
               {suggestions.series.map((item, key) => (
                  <option key={key} value={item}></option>
               ))}
            </datalist>
         </label>
      </>
   );
}
