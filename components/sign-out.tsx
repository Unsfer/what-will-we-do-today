"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      type='button'
      className='flex items-center justify-center transition-all bg-gray-200 rounded-lg w-9 h-9 dark:bg-gray-600 hover:ring-2 ring-gray-300'
      onClick={() => signOut()}
    >
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 text-gray-800 dark:text-gray-200' stroke='currentColor'>
        <path d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      </svg>
    </button>
  );
}
