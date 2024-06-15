'use server';
export async function filterBooks() {
   const a = await new Promise(result => {
      setTimeout(() => {
         result('yes');
      }, 10000);
   });
   //    console.log('call form', arguments);
   return { books: [] };
}
