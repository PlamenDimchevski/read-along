import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
   return (
      <div role="alert" className="alert">
         <InformationCircleIcon className="h-6 w-6 shrink-0 stroke-info" />
         <span>The Series you are trying to delete was not found.</span>
      </div>
   );
}
