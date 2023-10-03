import "@/styles/globals.css";
import { setSafeArea } from "@/utils/fixStatusBarHeight";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

// Create a client
const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  // const options = {
  //   clientSecret,
  //   appearance,
  // };
  return (
    <Provider store={store}>
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
          <Component {...pageProps} />
        </Elements>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
