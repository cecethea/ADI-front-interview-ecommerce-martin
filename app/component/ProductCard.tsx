"use client"

import Link from 'next/link';
import Product  from './types';
import Image from 'next/image';

type ProductCardProps = {
    product: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white" key={product.id}>
      <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none sm:h-96 relative">
          <Image
              src={product.thumbnailImage}
              alt={product.name}
              className="hidden lg:block rounded-lg"
              layout="fill"
              objectFit="cover"
              sizes="100vw"
          />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <Link href={`/products/${encodeURIComponent(product.productCategory)}/${product.id}`}>
            <div>
              <span 
                aria-hidden="true" 
                className="absolute inset-0"
                />
              {product.name}
            </div>
          </Link>
        </h3>
        <p className="text-sm text-gray-500">
          {product.description}
        </p>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-sm italic text-gray-500">{product.colorOptions.join(', ')}</p>
          <p className="text-base font-medium text-gray-900">${product.basePrice}</p>
        </div>
      </div>
    </div>  
  )};

export default ProductCard;
