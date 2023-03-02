import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextComponent } from "lib/context/auth";

export default function App({
  Component,
  pageProps: { message, ...pageProps },
}: AppProps) {
  return (
    <AuthContextComponent >
      <Component {...pageProps} />
    </AuthContextComponent>
  );
}

