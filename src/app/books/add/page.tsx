'use client';
import { useFormState, useFormStatus } from 'react-dom';
import BookForm from '../components/form';
import { addBook } from '../actions';
import { bookFormData } from '@/lib/constants';
import { FormErrors } from '../components/errorMessage';

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
