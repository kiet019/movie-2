import "../styles/global.scss";
import { AppProps } from "next/app";
import { store } from "../features/ReduxStore";
import { Provider } from "react-redux";
import Authcontext from "../components/AuthContext";
import Favorcontext from "../components/FavorContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Authcontext>
        <Favorcontext>
          <Component {...pageProps} />
        </Favorcontext>
      </Authcontext>
    </Provider>
  );
}
