'use client';

import { bookStatusList, defaultFormValues } from '@/lib/constants';
import FormWrapper from './formLoading';
import { manageSeries } from './actions';
import { useFormState } from 'react-dom';
import { SeriesFormData } from '@/types/series';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function ErrorMessage({ error, message }: { error?: boolean; message?: string }) {
   if (!error) {
      return null;
   }
   return (
      <div role="alert" className="alert alert-warning">
         <ExclamationTriangleIcon className="h-6 w-6 shrink-0 stroke-current" />
         <div>
            <h3 className="font-bold">Warning! {message}</h3>
         </div>
      </div>
   );
}

export function SeriesForm({
   children,
   data = defaultFormValues,
}: {
   children: React.ReactNode;
   data?: SeriesFormData['data'];
}) {
   const [state, formAction] = useFormState(manageSeries, { data, error: false, message: '' });

   return (
      <form action={formAction} className="flex flex-col gap-4">
         {children}
         <ErrorMessage error={state?.error} message={state?.message} />
         <FormWrapper>
            <input type="hidden" name="id" value={state.data?.id} />
            <label className="input input-bordered flex items-center gap-2">
               Name
               <input type="text" name="name" className="grow" defaultValue={state.data?.name} required />
            </label>
            <label className="input input-bordered flex items-center gap-2">
               Author
               <input type="text" name="author" className="grow" defaultValue={state.data?.author} required />
            </label>
            <select className="select select-bordered w-full" name="status" defaultValue={state.data?.status || ''}>
               <option value="" disabled>
                  Status
               </option>
               {Object.values(bookStatusList).map(item => (
                  <option key={item.value} value={item.value}>
                     {item.title}
                  </option>
               ))}
            </select>
         </FormWrapper>
         <div className="modal-action">
            <button type="submit" className="btn btn-primary">
               Save
            </button>
         </div>
      </form>
   );
}
