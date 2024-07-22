import Loading from '@/app/series/[id]/loading';
import Modal from '@/components/modal';

export default function LoadingEditBookModal({ params }: { params: { id: string } }) {
   return (
      <Modal basePath="/series">
         <Loading />
      </Modal>
   );
}
