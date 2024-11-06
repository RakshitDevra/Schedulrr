import {Inter} from "next/font/google"
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider} from '@clerk/nextjs'
import CreateEventDrawer from "@/components/createevent";
const inter=Inter({subsets:["latin"]});
export const metadata = {
  title: "Schedullr",
  description: "Meeting Scheduling App",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
    <ClerkProvider  publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <body
        className={`inter.className()`}
      >
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">{children}</main>
        <CreateEventDrawer />
        <Analytics />
      </body>
      </ClerkProvider>
    </html>
   
  );
}
