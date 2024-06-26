import NotFound from '@/app/books/[id]/delete/not-found';
import Modal from '@/components/modal';

export default function AddBookModal() {
   return (
      <Modal basePath="^/book/[0-9]*$">
         <NotFound />
      </Modal>
   );
}
