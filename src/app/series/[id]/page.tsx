import db from '@/lib/db';
import { SeriesForm } from '../form';
import { notFound } from 'next/navigation';

export default async function AddBooksSeries({ params }: { params: { id: string } }) {
   const series = await db.bookSeries.findUnique({ where: { id: Number(params.id) } });
   if (!series) {
      notFound();
   }
   return (
      <SeriesForm data={{ name: series.name, author: series.author, status: series.status, id: series.id }}>
         <h2 className="text-lg font-bold">Edit series</h2>
      </SeriesForm>
   );
}
