import "@/styles/globals.css";
import { setSafeArea } from "@/utils/fixStatusBarHeight";
import type { AppProps } from "next/app";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Analytics } from "@vercel/analytics/react";

import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";
import { Capacitor } from "@capacitor/core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import isMobileDevice from "@/hooks/isMobileDevice";
import Layout from "../components/shared/layout";
import { useEffect } from "react";
import { GlobalDebug } from "@/utils/removeConsoles";
import OneSignalComponent from "@/components/shared/one-signal-component";
import { ThemeProvider } from "@material-tailwind/react";
import MobileOnlyOverlay from "@/components/shared/mobile-only-overlay";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

// Create a client
const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const isMobile = isMobileDevice();

  // useEffect(() => {
  //   process.env.NODE_ENV === "production" && GlobalDebug(false, false);
  // }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      import("onesignal-cordova-plugin")
        .then((x) => x.default)
        .then((OneSignal: any) => {
          console.log("One signal initialisation");
          // Uncomment to set OneSignal device logging to VERBOSE
          OneSignal.setLogLevel(6, 0);
          // NOTE: Update the setAppId value below with your OneSignal AppId.

          OneSignal.setAppId("2156b6be-cab1-4c7c-8614-bc85911677cb");
          OneSignal.setNotificationOpenedHandler(function (jsonData: any) {
            console.log("coucou c'est nous");
            console.log(
              "notificationOpenedCallback: " + JSON.stringify(jsonData)
            );
          });
          // iOS - Prompts the user for notification permissions.
          //* Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
          OneSignal.promptForPushNotificationsWithUserResponse(function (
            accepted: any
          ) {
            console.log("coucou c'est nous ! on accepte ");
            console.log("User accepted notifications: " + accepted);
          });
        });
    }
  }, []);

  // const options = {
  //   clientSecret,
  //   appearance,
  // };
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
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
              {!isMobile&& <MobileOnlyOverlay />}

              <Layout>
                <Component {...pageProps} />
                <Analytics />
                {/* <OneSignalComponent /> */}
              </Layout>
            </Elements>
          </ThemeProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
