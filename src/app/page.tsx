export default function Home() {
   return (
      <main className="hero min-h-screen bg-base-200">
         <div className="hero-content text-center">
            <div className="max-w-md">
               <h1 className="text-5xl font-bold">Hello there</h1>
               <p className="py-6">
                  You&apos;ve arrived at the Book Club Readalong Assistant.
                  <br />
                  This tool is exclusively for our book club members. Please log in with your Discord account to verify
                  your membership and start your journey with us.
               </p>
               <button className="btn btn-primary">Get Started</button>
            </div>
         </div>
      </main>
   );
}
