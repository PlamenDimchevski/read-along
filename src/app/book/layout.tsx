import Navigation from '@/components/navigation';

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="min-h-screen bg-base-200">
         <Navigation />
         <main className="flex grow justify-center">
            <div className="w-3/5 pt-2">{children}</div>
         </main>
      </div>
   );
}
