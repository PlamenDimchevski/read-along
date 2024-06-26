'use client';
import Loading from '@/app/book/[bookId]/add/loading';
import Modal from '@/components/modal';
import { useParams } from 'next/navigation';

export default function LoadingAddChapterModal() {
   const params = useParams();

   return (
      <Modal basePath={`/book/${params.bookId}`}>
         <Loading />
      </Modal>
   );
}
