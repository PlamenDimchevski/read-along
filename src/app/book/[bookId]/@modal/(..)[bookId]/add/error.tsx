'use client';

import ErrorMessage from '@/app/book/[bookId]/add/error';
import Modal from '@/components/modal';
import { useParams } from 'next/navigation';

export default function ErrorBoundary({ error }: { error: Error }) {
   const params = useParams();
   return (
      <Modal basePath={`/book/${params.bookId}`}>
         <ErrorMessage error={error} />
      </Modal>
   );
}
