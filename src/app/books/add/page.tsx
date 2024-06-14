import BookForm from '../components/form';

export default function AddBook() {
   return (
      <form className="flex flex-col gap-4">
         <h3 className="text-lg font-bold">Add new book</h3>
         <BookForm />
      </form>
   );
}
