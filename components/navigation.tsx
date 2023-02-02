"use client";
import React, { useEffect, useState } from 'react';
import { Navbar } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SignOut from './sign-out';
import cn from 'lib/classNames';
import styles from "./navigation.module.css";


export default function Navigation() {
  const [mounted, setMounted] = useState<boolean>(false)
  const { resolvedTheme, setTheme } = useTheme();
  const { pathname } = useRouter();
  const { data } = useSession();
  const userName = data?.user?.name;

  useEffect(() => {
    setMounted(true);
  }, []);

  const hideNavMenu = () => {
    const appNavbar = document.querySelector('.app-navbar');
    const navMenu = appNavbar?.querySelector('.nav-menu-collapse');
    if (navMenu && !navMenu.classList.contains('hidden')) {
      setTimeout(() => {
        appNavbar?.querySelector('button')?.click();
      }, 500);
    }
  };

  return (
    <Navbar
      fluid={true}
      rounded={true}
      className={cn(styles.nav, 'bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 app-navbar')}
    >
      {userName && <>
        <Navbar.Toggle />
        <Navbar.Collapse className='mb-3 md:mb-0 nav-menu-collapse'>
          <Navbar.Link as={Link} href="/" active={pathname === '/'} onClick={hideNavMenu}>
            Главная
          </Navbar.Link>
          <Navbar.Link as={Link} href="/action" active={pathname === '/action'} onClick={hideNavMenu}>
            Создать
          </Navbar.Link>
        </Navbar.Collapse>
      </>}

      <div className='flex flex-row gap-1 text-tertiary items-center pl-3'>
        {userName}
      </div>

      <div className='flex flex-row items-center space-x-4'>
        {userName && <SignOut />}

        <button
          aria-label='Toggle Dark Mode'
          type='button'
          className='flex items-center justify-center transition-all bg-gray-200 rounded-lg w-9 h-9 dark:bg-gray-600 hover:ring-2 ring-gray-300'
          onClick={() => {
            console.log('CLICKED THEME', resolvedTheme);
            setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
          }}
        >
          {mounted && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              className='w-5 h-5 text-gray-800 dark:text-gray-200'
            >
              {resolvedTheme === 'dark' ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                />
              )}
            </svg>
          )}
        </button>
      </div>
    </Navbar>
  );
}

