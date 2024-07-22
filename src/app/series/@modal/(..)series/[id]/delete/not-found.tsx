import NotFound from '@/app/series/[id]/delete/not-found';
import Modal from '@/components/modal';

export default function NOtFountDeleteBookModal() {
   return (
      <Modal basePath="/series">
         <NotFound />
      </Modal>
   );
}
