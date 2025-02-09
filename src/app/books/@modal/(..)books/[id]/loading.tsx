import Loading from '@/app/books/[id]/loading';
import Modal from '@/components/modal';

export default function LoadingEditBookModal({ params }: { params: { id: string } }) {
   return (
      <Modal basePath="/books">
         <Loading />
      </Modal>
   );
}
