import { AppProps } from "next/app";
import "../styles/website/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { NextUIProvider } from "@nextui-org/react";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import { store } from "../redux/redux_store/store";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      {/* <SessionProvider session={session}> */}
      <Provider store={store}>
        <NextUIProvider>
          <Layout>
            <Script
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />

            <Script strategy="lazyOnload" id="google-analytics">
              {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
            </Script>
            <Component {...pageProps} />
          </Layout>
        </NextUIProvider>{" "}
      </Provider>
      {/* </SessionProvider> */}
    </>
  );
}
