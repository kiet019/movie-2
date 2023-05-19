import { NextUIProvider } from "@nextui-org/react";
import "../styles/global.scss";
import { AppProps } from "next/app";
import { store } from "../features/reduxstore";
import { Provider } from "react-redux";
import Authcontext from "../components/authcontext";
import Favorcontext from "../components/favorcontext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <Authcontext>
          <Favorcontext>
            <Component {...pageProps} />
          </Favorcontext>
        </Authcontext>
      </NextUIProvider>
    </Provider>
  );
}
