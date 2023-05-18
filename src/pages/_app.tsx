import { NextUIProvider } from "@nextui-org/react";
import "../styles/global.scss";
import { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/firebase/firebaseConfig";
import { store } from "../features/reduxstore";
import { Provider } from "react-redux";
import Setup  from "../components/setup";

const app = initializeApp(firebaseConfig);
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <Setup>
          <Component {...pageProps} />
        </Setup>
      </NextUIProvider>
    </Provider>
  );
}
