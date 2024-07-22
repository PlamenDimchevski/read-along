export default function Loading() {
   return (
      <div className="flex flex-col gap-4">
         <h3 className="text-lg font-bold">Add new book series</h3>
         <div className="skeleton h-12 w-full"></div>
         <div className="skeleton h-12 w-full"></div>
         <div className="skeleton h-12 w-full"></div>
      </div>
   );
}
