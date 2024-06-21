'use client';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function ErrorBoundary({ error }: { error: Error }) {
   return (
      <tr>
         <td colSpan={5}>
            <div role="alert" className="alert alert-error">
               <ExclamationCircleIcon className="h-6 w-6 shrink-0 stroke-current" />
               <span>Error! {error.message}</span>
            </div>
         </td>
      </tr>
   );
}
