import { redirect } from 'next/navigation';

export default function Book() {
   redirect('/books');
   return null;
}
