import NotFound from '@/app/books/[id]/not-found';
import Modal from '@/components/modal';

export default function NotFoundEditBookModal() {
   return (
      <Modal basePath="/books">
         <NotFound />
      </Modal>
   );
}
