import "@/styles/globals.css";
import { setSafeArea } from "@/utils/fixStatusBarHeight";
import type { AppProps } from "next/app";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Analytics } from '@vercel/analytics/react';

import { Provider } from "react-redux";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";
import { Capacitor } from '@capacitor/core';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useScreenDimension from "@/hooks/useScreenDimension";
import Layout from "../components/shared/layout";
import { useEffect } from "react";
import { GlobalDebug } from "@/utils/removeConsoles";
import OneSignalComponent from "@/components/shared/one-signal-component";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

// Create a client
const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const dimension = useScreenDimension();


  useEffect(() => {
    process.env.NODE_ENV === 'production' && GlobalDebug(false, false);
  }, []);



  // const options = {
  //   clientSecret,
  //   appearance,
  // };
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <QueryClientProvider client={queryClient}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
            />
          </Head>
          <Elements
            // options={{ ...options, appearance: { theme: "stripe" as const } }}
            stripe={stripePromise}
          >
            {dimension && dimension > 768 && (
              <div className="mobile-only-overlay h-screen">
                Accès disponible uniquement sur mobile
              </div>
            )}
           

            <Layout>
              <Component {...pageProps} />
              <Analytics />
              <OneSignalComponent />
            </Layout>
          </Elements>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
