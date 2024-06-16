import { getTextsForSuggestions } from '../actions';

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const suggestionList = await getTextsForSuggestions();

   return (
      <>
         {children}
         <datalist id="suggestion-list">
            {suggestionList.map((item: string, key: number) => (
               <option key={key} value={item}></option>
            ))}
         </datalist>
      </>
   );
}
