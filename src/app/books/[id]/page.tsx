import BookForm from '../components/form';

export default function EditBook({ params }: { params: { id: string } }) {
   return (
      <form className="flex flex-col gap-4">
         <h3 className="text-lg font-bold">Edit book</h3>
         <BookForm />
         <div className="modal-action">
            <button className="btn btn-primary">Save</button>
         </div>
      </form>
   );
}
