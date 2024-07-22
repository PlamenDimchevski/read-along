import DeleteBook from '@/app/series/[id]/delete/page';
import Modal from '@/components/modal';

export default function DeleteBookModal({ params }: { params: { id: string } }) {
   return (
      <Modal basePath="/series">
         <DeleteBook params={params} />
      </Modal>
   );
}
