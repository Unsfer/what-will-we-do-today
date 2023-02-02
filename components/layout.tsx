// These styles apply to every route in the application
import { Inter } from "@next/font/google";
import Toaster from "@/components/toaster";
import Navigation from "@/components/navigation";
import cn from 'lib/classNames';
import AppHead from "./head";

const inter = Inter({
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.variable}>
      <AppHead/>
      <Toaster/>
      <div
        className={cn(
          'text-primary',
          'relative h-full min-h-screen w-full',
          'flex flex-col',
          'motion-reduce:transition-none motion-reduce:transform-none'
        )}
      >
        <Navigation/>
        
        <main
          className={cn(
            'px-4 mt-24',
            'max-w-7xl',
            'mx-auto my-auto',
            'flex flex-col justify-center gap-12',
            'divide-y divide-gray-200 dark:divide-gray-900',
            'rounded-lg'
          )}
        >
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}

