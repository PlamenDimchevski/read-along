'use client';

import { useFormStatus } from 'react-dom';

export default function FormWrapper({ children }: { children: React.ReactNode }) {
   const { pending } = useFormStatus();

   if (pending) {
      return (
         <>
            <div className="skeleton h-12 w-full"></div>
            <div className="skeleton h-12 w-full"></div>
            <div className="skeleton h-12 w-full"></div>
         </>
      );
   }

   return children;
}
