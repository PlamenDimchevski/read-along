'use client';

import ErrorMessage from '@/app/series/add/error';
import Modal from '@/components/modal';

export default function ErrorBoundary({ error }: { error: Error }) {
   return (
      <Modal basePath="/series">
         <ErrorMessage error={error} />
      </Modal>
   );
}
