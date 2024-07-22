import Loading from '@/app/series/add/loading';
import Modal from '@/components/modal';

export default function LoadingBookModal({ params }: { params: { id: string } }) {
   return (
      <Modal basePath="/series">
         <Loading />
      </Modal>
   );
}
