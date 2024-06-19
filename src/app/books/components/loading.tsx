import Description from './description';

export function Loading() {
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
