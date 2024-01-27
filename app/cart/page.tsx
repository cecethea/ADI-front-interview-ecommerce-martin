'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartItem = localStorage.getItem('cart');
    if (cartItem) setCartItems(JSON.parse(cartItem));
  }, []);

  return (
    <div className='flex min-h-screen flex-col items-center bg-gray-100 pt-10'>
      <div className='mb-2 flex w-full max-w-xl items-center justify-center rounded-lg bg-yellow-400 p-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-32 w-32 text-yellow-700'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9 17v2m1-3v3m0 0h-1m1 0h1m2-13.5V9m0 11v-3m1 3v-3m-1 0h1m0 0h-1m1 0h-1m-6 0H9m1 0h1m1-6V7.5m0 0V9m0 0V7.5m0 0V6m0 6v3m0 0v-3m0 0V9m0 6v3m0 0v-3m0 0V9'
          />
        </svg>
      </div>

      <h1 className='mb-2 text-3xl font-bold text-gray-800'>Cart Page</h1>

      <div className='mb-8 w-full max-w-xl rounded-lg bg-white p-2 shadow-md'>
        <pre className='text-left text-gray-800'>
          {JSON.stringify(cartItems, null, 2)}
        </pre>
      </div>

      <Link href='/products'>
        <p className='rounded bg-blue-600 px-4 py-2 text-lg font-bold text-white transition duration-300 hover:bg-blue-700'>
          Back to Products Page
        </p>
      </Link>
    </div>
  );
}
