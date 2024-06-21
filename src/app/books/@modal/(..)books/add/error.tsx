'use client';

import ErrorMessage from '@/app/books/add/error';
import Modal from '@/components/modal';

export default function ErrorBoundary({ error }: { error: Error }) {
   return (
      <Modal basePath="/books">
         <ErrorMessage error={error} />
      </Modal>
   );
}
