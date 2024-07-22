import Modal from '@/components/modal';
import AddBook from '@/app/series/add/page';

export default function AddBookModal() {
   return (
      <Modal basePath="/series">
         <AddBook />
      </Modal>
   );
}
