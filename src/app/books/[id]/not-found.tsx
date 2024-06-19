import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
   return (
      <div role="alert" className="alert">
         <InformationCircleIcon className="h-6 w-6 shrink-0 stroke-info" />
         <span>The book you are trying to edit was not found.</span>
      </div>
   );
}
