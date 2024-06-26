import Loading from '@/app/books/add/loading';
import Modal from '@/components/modal';

export default function LoadingBookModal({ params }: { params: { id: string } }) {
   return (
      <Modal basePath="/books">
         <Loading />
      </Modal>
   );
}
