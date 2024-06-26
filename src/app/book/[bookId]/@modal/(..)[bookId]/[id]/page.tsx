import EditBook from '@/app/books/[id]/page';
import Modal from '@/components/modal';

export default function EditBookModal({ params }: { params: { id: string } }) {
   return (
      <Modal basePath="^/book/[0-9]*$">
         <EditBook params={params} />
      </Modal>
   );
}
