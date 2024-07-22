import { getSeriesData } from '../../actions';
import DeleteSeriesForm from './form';

export default async function DeleteSeries({ params }: { params: { id: string } }) {
   const serriesData = await getSeriesData(Number(params.id));
   return (
      <DeleteSeriesForm>
         <article className="prose">
            <span className="text-gradient mb-4 text-base font-semibold uppercase sm:mb-2">
               Are you shure you want to delete this book series
            </span>
            <h2 className="mb-10 text-3xl font-semibold sm:mb-6 sm:text-4xl">{serriesData?.name}</h2>
            <span className="text-gradient mb-4 text-base font-semibold uppercase sm:mb-2">This series have</span>
            <h3 className="mb-10 font-semibold sm:mb-6">
               Books {serriesData?._count.books} and Characters {serriesData?._count.character}
            </h3>
         </article>
         <input type="hidden" value={params.id} name="seriesID" />
      </DeleteSeriesForm>
   );
}
