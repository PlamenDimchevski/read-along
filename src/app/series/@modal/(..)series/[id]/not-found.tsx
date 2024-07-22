import NotFound from '@/app/series/[id]/not-found';
import Modal from '@/components/modal';

export default function NotFoundEditBookModal() {
   return (
      <Modal basePath="/series">
         <NotFound />
      </Modal>
   );
}
