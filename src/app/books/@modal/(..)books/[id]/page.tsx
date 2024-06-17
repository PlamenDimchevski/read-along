import EditBook from '@/app/books/[id]/page';
import Modal from '@/components/modal';

export default function EditBookModal() {
   return (
      <Modal basePath="/books">
         <EditBook />
      </Modal>
   );
}
