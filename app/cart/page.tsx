"use client"

import  { useEffect, useState } from 'react';
import Link from 'next/link';


export default function CartPage() {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const cartItem = localStorage.getItem('cart')
    if (cartItem) setCartItems(JSON.parse(cartItem))
  }, [])

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-10">

      <div className="w-full max-w-xl bg-yellow-400 p-2 rounded-lg mb-2 flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v2m1-3v3m0 0h-1m1 0h1m2-13.5V9m0 11v-3m1 3v-3m-1 0h1m0 0h-1m1 0h-1m-6 0H9m1 0h1m1-6V7.5m0 0V9m0 0V7.5m0 0V6m0 6v3m0 0v-3m0 0V9m0 6v3m0 0v-3m0 0V9" />
        </svg>
      </div>

      <h1 className="text-3xl text-gray-800 font-bold mb-2">Cart Page</h1>

      <div className="w-full max-w-xl bg-white p-2 rounded-lg shadow-md mb-8">
        <pre className="text-left text-gray-800">{JSON.stringify(cartItems, null, 2)}</pre>
      </div>

      <Link href="/products">
        <p className="text-lg bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          Back to Products Page
        </p>
      </Link>
    </div>
  );
}