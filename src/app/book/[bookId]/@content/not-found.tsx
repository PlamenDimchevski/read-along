import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
   return (
      <tr>
         <td colSpan={5}>
            <div role="alert" className="alert">
               <InformationCircleIcon className="h-6 w-6 shrink-0 stroke-info" />
               <span>No result were found for your query</span>
            </div>
         </td>
      </tr>
   );
}
