import Loading from '@/app/books/[id]/loading';
import Modal from '@/components/modal';

export default function EditBookModal() {
   return (
      <Modal basePath="^/book/[0-9]*$">
         <Loading />
      </Modal>
   );
}
