import EditBook from '@/app/series/[id]/page';
import Modal from '@/components/modal';

export default function EditBookModal({ params }: { params: { id: string } }) {
   return (
      <Modal basePath="/series">
         <EditBook params={params} />
      </Modal>
   );
}
