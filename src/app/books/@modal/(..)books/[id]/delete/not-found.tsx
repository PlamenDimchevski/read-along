import NotFound from '@/app/books/[id]/delete/not-found';
import Modal from '@/components/modal';

export default function NOtFountDeleteBookModal() {
   return (
      <Modal basePath="/books">
         <NotFound />
      </Modal>
   );
}
