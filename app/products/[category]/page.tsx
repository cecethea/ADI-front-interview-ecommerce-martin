import Link from 'next/link';
import Product from '../../component/types';
import { getByCategory } from '../../component/api';
import ProductCard from '../../component/ProductCard';

export default async function Page({
  params: { category },
}: {
  params: { category: string };
}) {
  const products = await getByCategory(category);

  return (
    <main>
      <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
        <h2 className='sr-only'>Products</h2>
        <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3'>
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className='mt-3'>
          <Link href='/products' className='mt-2'>
            <button className='rounded-lg bg-gray-800 px-4 py-2 text-white'>
              Back to all products
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
