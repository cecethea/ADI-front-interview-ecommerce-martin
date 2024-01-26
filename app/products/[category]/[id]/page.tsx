"use client"

import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import { getProduct } from '@/app/component/api'
import { useRouter } from 'next/navigation';
import ColorCard from '@/app/component/ColorCard'
import StorageCard from '@/app/component/StorageCard'
import Product from '@/app/component/types'

type Cart = {
  id: string;
  color: string;
  storage: string;
};
 
export default function Page({params: { id }}: { params: { id: string }}) {

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [product, setProduct] = useState<Product | null>();
  const cart: Cart[] = [];
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const color = searchParams?.get('color');
  const storage = searchParams?.get('storage');

  useEffect(() => {
    if (color) {
      setSelectedColor(color);
    }
    if (storage) {
      setSelectedStorage(storage);
    }
  }, [color, storage]);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedColor && !selectedStorage) {
      toast.error('Please select a color and storage option before proceeding.');
      return;
    } else if (!selectedColor) {
      toast.error('Please select a color before proceeding.');
      return;
    } else if (!selectedStorage) {
      toast.error('Please select a storage option before proceeding.');
      return;
    }
    
    const cartData = {
      id: id,
      color: selectedColor,
      storage: selectedStorage,
    };

    cart.push(cartData);
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Product added to cart!');
    router.push('/cart');
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const productData: Product = await getProduct(id);
      setProduct(productData);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div></div>;
  }
  
  return (
    <div className="bg-white">
      <ToastContainer />
      <div className="pb-16 pt-6 sm:pb-24">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div className="flex items-center">
                <Link href="/products" className="mr-4 text-sm font-medium text-gray-900">
                  Products
                </Link>
                <svg
                  viewBox="0 0 6 20"
                  aria-hidden="true"
                  className="h-5 w-auto text-gray-300"
                >
                  <path
                    d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <Link href={`/products/${product.productCategory}`} className="mr-4 text-sm font-medium text-gray-900">
                  {product.productCategory}
                </Link>
                <svg
                  viewBox="0 0 6 20"
                  aria-hidden="true"
                  className="h-5 w-auto text-gray-300"
                >
                  <path
                    d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </li>
            <li className="text-sm">
              <a
                href="#"
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">{product.name}</h1>
                <p className="text-xl font-medium text-gray-900">{`$${product.basePrice}`}</p>
              </div>
              {/* Reviews */}
              <div className="mt-4">
                <h2 className="sr-only">{}</h2>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    3.9
                    <span className="sr-only"> out of 5 stars</span>
                  </p>
                  <div className="ml-1 flex items-center">
                    {/* Active: "text-yellow-400", Inactive: "text-gray-200" */}
                    <svg
                      className="text-yellow-400 h-5 w-5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <svg
                      className="text-yellow-400 h-5 w-5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <svg
                      className="text-yellow-400 h-5 w-5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <svg
                      className="text-yellow-400 h-5 w-5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <svg
                      className="text-gray-200 h-5 w-5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                    ·
                  </div>
                  <div className="ml-4 flex">
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      See all 512 reviews
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Images</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                <Image
                  src={product.thumbnailImage}
                  alt={product.name}
                  className="lg:col-span-2 lg:row-span-2 rounded-lg"
                  width={800}
                  height={400}
                />
                <Image
                    src={product.thumbnailImage}
                    width={400}
                    height={100}
                    alt={product.name}
                    className="hidden lg:block rounded-lg"
                />
                <Image
                    src={product.thumbnailImage}
                    width={400}
                    height={100}
                    alt={product.name}
                    className="hidden lg:block rounded-lg"
                />
            </div>
            </div>
            <div className="mt-8 lg:col-span-5">
              <form onSubmit={handleSubmit}>
                {/* Color picker */}
                <div>
                  <h2 className="text-sm font-medium text-gray-900">Color</h2>
                  <fieldset className="mt-2">
                    <legend className="sr-only">Choose a color</legend>
                    <ColorCard colorOptions={product.colorOptions} selectedColor={selectedColor} onColorChange={setSelectedColor} />
                  </fieldset>
                </div>
                {/* Size picker */}
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900">Size</h2>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                    </a>
                  </div>
                  <fieldset className="mt-2">
                    <legend className="sr-only">Choose a size</legend>
                    <StorageCard storageOptions={product.storageOptions} selectedSize={selectedStorage} onSizeChange={setSelectedStorage} inStock={product.inStock} />
                  </fieldset>
                </div>
                {/* In stock */}
                <div className="mt-8">
                  <span className="text-sm font-medium text-gray-900">
                    {product.inStock ? (
                      <p className="flex items-center text-green-500">
                          In stock
                      </p>
                      ) : (
                          <p className="flex items-center text-red-500">
                              Out of stock
                          </p>
                      )
                    }
                  </span>
                  {/* <Link href={`/cart`}>  */}
                    <button
                      type="submit"
                      className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add to cart
                    </button>
                  {/* </Link> */}
                 
                </div>
                
              </form>
              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Description</h2>
                <div className="prose prose-sm mt-4 text-gray-500">
                  <p>{product.description}</p>
                </div>
              </div>
              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">
                  CPU 
                </h2>
                <div className="prose prose-sm mt-4 text-gray-500">
                  <p>{product.CPU}</p>
                </div>
              </div>
              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">
                  Display
                </h2>
                <div className="prose prose-sm mt-4 text-gray-500">
                  <p>{product.display}</p>
                </div>
              </div>
              {/* Policies */}
              <section aria-labelledby="policies-heading" className="mt-10">
                <h2 id="policies-heading" className="sr-only">
                  Our Policies
                </h2>
                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                    <dt>
                      <svg
                        className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"
                        />
                      </svg>
                      <span className="mt-4 text-sm font-medium text-gray-900">
                        International delivery
                      </span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-500">
                      Get your order in 2 years
                    </dd>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                    <dt>
                      <svg
                        className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="mt-4 text-sm font-medium text-gray-900">
                        Loyalty rewards
                      </span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-500">
                        Don&apos;t look at other tees
                    </dd>
                  </div>
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
