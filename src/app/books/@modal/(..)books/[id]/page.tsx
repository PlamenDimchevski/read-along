import EditBook from '@/app/books/[id]/page';
import Modal from '@/components/modal';

export default function EditBookModal({ params }: { params: { id: string } }) {
   return (
      <Modal basePath="/books">
         <EditBook params={params} />
      </Modal>
   );
}
