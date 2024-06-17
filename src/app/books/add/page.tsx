'use client';
import { useFormState, useFormStatus } from 'react-dom';
import BookForm from '../components/form';
import { addBook } from '../actions';
import { bookFormData } from '@/lib/constants';
import { BookFormFieldErrors } from '@/types/books';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function AddContent() {
   const { pending } = useFormStatus();
   if (pending) {
      return <div className="skeleton h-52 w-full"></div>;
   }
   return (
      <textarea
         name="content"
         required
         className="textarea textarea-bordered min-h-52"
         placeholder="Book Content"
      ></textarea>
   );
}

function FormErrors({ status, message, errors }: { status: boolean; message: string; errors: BookFormFieldErrors }) {
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

export default function AddBook() {
   const [state, formAction] = useFormState(addBook, bookFormData);
   if (!state) {
      return null;
   }

   return (
      <form action={formAction} className="flex flex-col gap-4">
         <h2 className="text-lg font-bold">Add new book</h2>
         <FormErrors status={state.status} message={state.message} errors={state.errors} />
         <BookForm />
         <AddContent />
         <div className="modal-action">
            <button type="submit" className="btn btn-primary">
               Save
            </button>
         </div>
      </form>
   );
}
