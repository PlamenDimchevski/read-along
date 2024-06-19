import Loading from '@/app/books/add/loading';
import Modal from '@/components/modal';

export default function EditBookModal({ params }: { params: { id: string } }) {
   return (
      <Modal basePath="/books">
         <Loading />
      </Modal>
   );
}
