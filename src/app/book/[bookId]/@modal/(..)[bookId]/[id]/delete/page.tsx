import DeleteBook from '@/app/books/[id]/delete/page';
import Modal from '@/components/modal';

export default function EditBookModal({ params }: { params: { id: string } }) {
   return (
      <Modal basePath="^/book/[0-9]*$">
         <DeleteBook params={params} />
      </Modal>
   );
}
