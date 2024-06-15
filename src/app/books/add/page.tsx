import BookForm from '../components/form';

export default function AddBook() {
   return (
      <form className="flex flex-col gap-4">
         <h3 className="text-lg font-bold">Add new book</h3>
         <BookForm />

         <textarea className="textarea textarea-bordered" placeholder="Book Content"></textarea>

         <div className="modal-action">
            <button className="btn btn-primary">Save</button>
         </div>
      </form>
   );
}
