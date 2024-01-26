import  Product from '../component/types';
import ProductCard from '../component/ProductCard';
import { getData } from '../component/api';

export default async function Page() {
  
  const products = await getData()

  if (!products) return <div></div>

  return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-10">
          {products.map((product: Product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    )
  }