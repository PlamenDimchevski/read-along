import DeleteBook from '@/app/books/[id]/delete/page';
import Modal from '@/components/modal';

export default function EditBookModal() {
   return (
      <Modal basePath="/books">
         <DeleteBook />
      </Modal>
   );
}
