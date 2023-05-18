import { NextUIProvider } from "@nextui-org/react";
import "../styles/global.scss";
import { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/firebase/authcontext";

const app = initializeApp(firebaseConfig);
export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
        <Component {...pageProps} />
    </NextUIProvider>
  );
}
