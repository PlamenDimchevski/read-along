'use client';

import { useFormState } from 'react-dom';
import { editBook } from '../actions';
import { BookFormData } from '@/types/books';

export default function EditBookForm({ children, formData }: { children: React.ReactNode; formData: BookFormData }) {
   const [state, formAction] = useFormState(editBook, formData);
   return (
      <form action={formAction} className="flex flex-col gap-4">
         {children}
         <div className="modal-action">
            <button className="btn btn-primary">Save</button>
         </div>
      </form>
   );
}
