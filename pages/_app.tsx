import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

interface PageWrapperProps {
  children: React.ReactNode;
  title: string;
}
export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  title,
}: PageWrapperProps) => {
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
};

const pageMap: { [pathname: string]: string } = {
  "/": "Homepage",
};

export default function App({
  Component,
  pageProps,
}: AppProps): React.ReactNode {
  const router = useRouter();
  const { pathname } = router;
  return (
    <ChakraProvider>
            <PageWrapper title={pageMap[pathname]}>
              <Component {...pageProps} />
            </PageWrapper>
    </ChakraProvider>
  );
}