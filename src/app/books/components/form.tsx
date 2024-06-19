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
   const [seriesData, setSeriesData] = useState({
      name: data?.bookSeries?.name,
      author: data?.bookSeries?.author,
   });

   const handelUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchName = event.target.name === 'series' ? 'name' : 'author';
      const relatedName = event.target.name === 'series' ? 'author' : 'name';
      const value = event.target.value;
      const selectedSeries = suggestions.series.find(item => item[searchName] === seriesData[searchName]);

      console.log(
         selectedSeries,
         selectedSeries?.[relatedName],
         seriesData[relatedName],
         selectedSeries && selectedSeries?.[relatedName] !== seriesData[relatedName]
      );
      setSeriesData(state => ({ ...state, [searchName]: value }));
   };

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
         <label className="input input-bordered flex items-center gap-2">
            Author
            <input
               list="book-author-list"
               type="author"
               name="author"
               className="grow"
               defaultValue={seriesData.author}
               onChange={handelUpdate}
               required
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
               defaultValue={seriesData.name}
               onChange={handelUpdate}
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
