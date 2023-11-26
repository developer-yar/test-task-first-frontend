import { Montserrat } from "next/font/google";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { wrapper } from "../components/redux/store";
import { UserContextProvider } from "../components/context/user";
import "../styles/globals.css";

const montserrat = Montserrat({
  weight: "500",
  subsets: ["latin", "cyrillic"],
});

export default function App({ Component, ...pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <section className={montserrat.className}>
          <UserContextProvider>
            <Component {...pageProps} />
          </UserContextProvider>
        </section>
      </PersistGate>
    </Provider>
  );
}
