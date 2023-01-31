import "@/styles/globals.css";
import RootLayout from '@/components/layout';
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from 'next-themes';

import type { AppProps } from "next/app"
import type { Session } from "next-auth"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute='class' disableTransitionOnChange>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ThemeProvider>
    </SessionProvider>
  )
}

