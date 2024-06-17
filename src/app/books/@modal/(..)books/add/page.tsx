import Modal from '@/components/modal';
import AddBook from '@/app/books/add/page';

export default function AddBookModal() {
   return (
      <Modal basePath="/books">
         <AddBook />
      </Modal>
   );
}
