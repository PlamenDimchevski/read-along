import BookForm from '../components/form';

export default function EditBook() {
   return (
      <form className="flex flex-col gap-4">
         <h3 className="text-lg font-bold">Edit book</h3>
         <BookForm />
      </form>
   );
}
