import Description from '../components/description';

export default function Loading() {
   return (
      <div className="flex flex-col gap-4">
         <h3 className="text-lg font-bold">Edit book</h3>
         <Description />
         <div className="skeleton h-12 w-full"></div>
         <div className="skeleton h-12 w-full"></div>
         <div className="skeleton h-12 w-full"></div>
         <div className="skeleton h-12 w-full"></div>
         <div className="skeleton h-52 w-full"></div>
      </div>
   );
}
