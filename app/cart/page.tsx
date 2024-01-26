import Image from 'next/image'
import Link from 'next/link'

 
export default async function Page({params: { category }}: {params: { category: string }}) {
  
  return (
    <main>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="sr-only">Products</h2>
         <div className="mt-3">
            <Link href="/products" className="mt-2">
                <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">Back to all products</button>
            </Link>
         </div>
        </div>
    </main>
  )
}