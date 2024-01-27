'use client';
import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Page({
  storageOptions,
  selectedSize,
  onSizeChange,
  inStock,
}: {
  storageOptions: string[];
  selectedSize: string;
  onSizeChange: (storage: string) => void;
  inStock: boolean;
}) {
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const color = searchParams?.get('color');

  const handleSizeChange = (storage: string) => {
    onSizeChange(storage);
    if (color) {
      const newUrl = `${pathname}?color=${color}&storage=${storage}`;
      router.push(newUrl);
      return;
    } else {
      const newUrl = `${pathname}?storage=${storage}`;
      router.push(newUrl);
      return;
    }
  };

  return (
    <div className='grid grid-cols-3 gap-3 sm:grid-cols-6'>
      {storageOptions.map((storageOption, index) => {
        const isActive = storageOption === activeOption;
        const isChecked = storageOption === selectedSize;
        const isAvailable = inStock;

        return (
          <label
            key={index}
            className={`flex items-center justify-center rounded-md px-3 py-3 text-sm font-medium uppercase ring-1 ring-black focus:outline-none sm:flex-1
                            ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed opacity-25'}
                            ${isActive ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}
                            ${isChecked ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700' : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'}`}
            onMouseEnter={() => setActiveOption(storageOption)}
            onMouseLeave={() => setActiveOption(null)}
          >
            <input
              type='radio'
              name='storage'
              value={storageOption}
              className='sr-only'
              aria-labelledby={`size-choice-${index}-label`}
              checked={isChecked}
              onChange={() => handleSizeChange(storageOption)}
              disabled={!isAvailable}
            />
            <span
              id={`storage-choice-${index}-label`}
              className={`block text-center ${isChecked ? 'text-white' : 'text-gray-900'}`}
            >
              {storageOption}
            </span>
          </label>
        );
      })}
    </div>
  );
}
