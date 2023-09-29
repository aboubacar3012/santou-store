import "@/styles/globals.css";
import { setSafeArea } from "@/utils/fixStatusBarHeight";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    setSafeArea();
  }, []);

  return (
    <>
      <Component {...pageProps} />;{/* <!-- from node_modules --> */}
      <script
        async
        src="node_modules/@material-tailwind/html@latest/scripts/dialog.js"
      ></script>
      {/* <!-- from cdn --> */}
      <script
        async
        src="https://unpkg.com/@material-tailwind/html@latest/scripts/dialog.js"
      ></script>
    </>
  );
}
