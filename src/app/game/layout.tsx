import Navigation from '@/components/navigation';

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="flex min-h-screen flex-col bg-base-200">
         <Navigation />

         <main className="flex grow justify-center">
            <div className="w-full max-w-screen-xl p-2">
               <div className="flex h-full w-full flex-col">{children}</div>
            </div>
         </main>
      </div>
   );
}
