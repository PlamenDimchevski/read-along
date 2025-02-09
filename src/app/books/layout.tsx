import Navigation from '@/components/navigation';

export default function RootLayout({
   modal,
   filterForm,
   content,
   children,
}: Readonly<{
   modal: React.ReactNode;
   filterForm: React.ReactNode;
   content: React.ReactNode;
   children: React.ReactNode;
}>) {
   return (
      <div className="flex min-h-screen flex-col bg-base-200">
         <Navigation />
         {modal}
         <main className="flex grow justify-center">
            <div className="w-full max-w-screen-xl p-2">
               <div className="flex h-full w-full flex-col">
                  {children}
                  <div className="card grid place-items-center">{filterForm}</div>
                  <div className="divider"></div>
                  <div className="grid h-full">
                     <div className="overflow-x-auto pb-48">{content}</div>
                  </div>
               </div>
            </div>
         </main>
      </div>
   );
}
