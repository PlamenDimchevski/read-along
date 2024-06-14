import EditBook from '@/app/books/[id]/page';
import Modal from '@/components/modal';

export default function EditBookModal() {
   return (
      <Modal>
         <EditBook />
      </Modal>
   );
}
