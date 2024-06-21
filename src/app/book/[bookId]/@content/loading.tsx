export default function Loading() {
   return (
      <tr>
         <td colSpan={5}>
            <div className="flex w-full flex-col gap-4">
               <div className="skeleton h-10 w-full"></div>
               <div className="skeleton h-10 w-full"></div>
            </div>
         </td>
      </tr>
   );
}
