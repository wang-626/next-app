import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextComponent } from "lib/context/auth";
import Header from "components/header";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 

export default function App({ Component, pageProps: { message, ...pageProps } }: AppProps) {
  return (
    <AuthContextComponent>
      <div className="h-screen bg-base-300">
        <div className="container mx-auto ">
          <Header />
          <Component {...pageProps} />
        </div>
      </div>
    </AuthContextComponent>
  );
}
