import { NextResponse } from 'next/server';
import { getNamesForSuggestion } from '../../actions';
import { BooksSuggestion, BooksSuggestionsContent } from '@/types/books';

export async function GET() {
   const data = await getNamesForSuggestion();
   return NextResponse.json(
      data.reduce(
         (content: BooksSuggestionsContent, item: BooksSuggestion) => {
            if (!content.author.includes(item.bookSeries?.author || '')) {
               content.author.push(item.bookSeries?.author || '');
            }
            if (!content.series.includes(item.bookSeries?.name || '')) {
               content.series.push(item.bookSeries?.name || '');
            }
            if (!content.book.includes(item.name)) {
               content.book.push(item.name);
            }
            return content;
         },
         { author: [], book: [], series: [] }
      )
   );
}
