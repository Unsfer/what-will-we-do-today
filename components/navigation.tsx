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

  return (
    <Navbar
      fluid={true}
      rounded={true}
      className={cn(styles.nav, 'bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600')}
    >
      {userName && <>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link as={Link} href="/" active={pathname === '/'}>
            Главная
          </Navbar.Link>
          <Navbar.Link as={Link} href="/action" active={pathname === '/action'}>
            Создать
          </Navbar.Link>
        </Navbar.Collapse>
      </>}

      <div className='flex flex-row gap-1 text-tertiary items-center'>
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
    // <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
    //   <div className="container flex flex-wrap items-center justify-between mx-auto max-w-2xl">
    //     {true && <>
    //       <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
    //         <span className="sr-only">Open main menu</span>
    //         <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    //           <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
    //         </svg>
    //       </button>
    //       <div className="hidden w-full md:block md:w-auto" id="navbar-default">
    //         <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    //           <li>
    //             <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
    //           </li>
    //           <li>
    //             <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
    //           </li>
    //           <li>
    //             <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
    //           </li>
    //           <li>
    //             <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
    //           </li>
    //           <li>
    //             <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
    //           </li>
    //         </ul>
    //       </div>
    //     </>}

    //   </div>
    // </nav>


    // <nav className='sticky w-full bg-gray-100/40 z-[1] filter-blur dark:bg-gray-1000/40 top-2 md:top-4 max-w-2xl px-4 py-2 rounded-md mx-auto flex justify-between items-center'>
    //   {userName && <>
    //     <div className='flex flex-row gap-1 text-tertiary'>
    //       <Link
    //         href="/action"
    //         prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
    //         className="inline-flex items-center px-4 py-2 mr-3 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 hover:ring-2 ring-gray-300"
    //       >
    //         <svg fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 mr-2" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    //           <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
    //         </svg>
    //         Новое мероприятие
    //       </Link>
    //     </div>
    //   </>}
    //   
    //     
    //   </div>
    // </nav>
  );
}

