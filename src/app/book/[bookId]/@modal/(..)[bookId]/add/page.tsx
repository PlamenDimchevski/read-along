import Modal from '@/components/modal';
import AddChapter from '@/app/book/[bookId]/add/page';

export default async function AddChapterModal({ params }: { params: { bookId: string } }) {
   return (
      <Modal basePath={`/book/${params.bookId}`}>
         <AddChapter params={params} />
      </Modal>
   );
}
