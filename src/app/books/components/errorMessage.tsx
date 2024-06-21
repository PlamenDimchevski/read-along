import { BookFormFieldErrors } from '@/types/books';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
export function FormErrors({
   status,
   message,
   errors,
}: {
   status: boolean;
   message: string;
   errors: BookFormFieldErrors;
}) {
   if (status) {
      return null;
   }
   return (
      <div role="alert" className="alert alert-warning">
         <ExclamationTriangleIcon className="h-6 w-6 shrink-0 stroke-current" />
         <div>
            <h3 className="font-bold">Warning! {message}</h3>
            {Object.values(errors).map((item, key) => {
               if (!item.error) {
                  return null;
               }
               return (
                  <div key={key} className="text-xs">
                     {item.message}
                  </div>
               );
            })}
         </div>
      </div>
   );
}
