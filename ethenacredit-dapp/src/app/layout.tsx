"use client";
import "@/styles/globals.css";

import { useEffect, useState } from "react";
import Layout from "@/components/Layouts";

import { ThirdwebProvider } from "thirdweb/react";
import { Toaster } from "react-hot-toast";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <html>
      <body>
        {ready ? (
            <ThirdwebProvider
            >
              <Layout>
                <Toaster position="bottom-center" />
                {children}
              </Layout>
            </ThirdwebProvider>
        ) : null}
      </body>
    </html>
  );
}
