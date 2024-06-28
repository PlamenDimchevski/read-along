import EditBook from '@/app/book/[bookId]/[id]/page';
import Modal from '@/components/modal';

export default function EditBookModal({ params }: { params: { bookId: string; id: string } }) {
   return (
      <Modal basePath={`/book/${params.bookId}`}>
         <EditBook params={params} />
      </Modal>
   );
}
