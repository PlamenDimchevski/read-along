import { NextResponse } from 'next/server';
import { getNamesForSuggestion } from '../../actions';
import { BooksSuggestion, BooksSuggestionsContent } from '@/types/books';

export async function GET() {
   const data = await getNamesForSuggestion();
   return NextResponse.json(
      data.reduce(
         (content: BooksSuggestionsContent, item: BooksSuggestion) => {
            if (!content.series.find(element => item.bookSeries?.id === element.id)) {
               content.series.push({
                  name: item.bookSeries?.name,
                  id: item.bookSeries?.id,
                  author: item.bookSeries?.author,
               });
            }
            if (!content.book.find(element => item.id === element.id)) {
               content.book.push({ name: item.name, id: item.id });
            }
            return content;
         },
         { book: [], series: [] }
      )
   );
}
