import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextComponent } from "lib/context/auth";
import Header from "components/header";
import Footer from "components/footer";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function App({ Component, pageProps: { message, ...pageProps } }: AppProps) {
  return (
    <AuthContextComponent>
      <Header />
      <div className="h-body bg-base-200">
        <div className="container mx-auto">
          <Component {...pageProps} />
        </div>
      </div>
      <Footer />
    </AuthContextComponent>
  );
}
