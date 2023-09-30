import "@/styles/globals.css";
import { setSafeArea } from "@/utils/fixStatusBarHeight";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { store } from "../redux/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    setSafeArea();
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />;{/* <!-- from node_modules --> */}
    </Provider>
  );
}
