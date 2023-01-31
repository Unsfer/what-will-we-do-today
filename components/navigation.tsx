"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useTheme } from 'next-themes';
import Link from 'next/link';
import SignOut from './sign-out';


export default function Navigation() {
    const [mounted, setMounted] = useState<boolean>(false)
    const { resolvedTheme, setTheme } = useTheme();
    const { data } = useSession();
    const userName = data?.user?.email;

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className='sticky w-full bg-gray-100/40 z-[1] filter-blur dark:bg-gray-1000/40 top-2 md:top-4 max-w-2xl px-4 py-2 rounded-md mx-auto flex justify-between items-center'>
            {userName && <>
                <div className='flex flex-row gap-1 text-tertiary'>
                    <Link
                        href="/protected"
                        prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
                        className="inline-flex items-center px-4 py-2 mr-3 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 hover:ring-2 ring-gray-300"
                    >
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 mr-2" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
                        </svg>
                        Protected Page
                    </Link>
                </div>
                <div className='flex flex-row gap-1 text-tertiary items-center'>
                    {userName}
                </div>
            </>}
            <div className='flex flex-row items-center space-x-4'>
                {userName && <SignOut/>}
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
        </nav>
    );
}

