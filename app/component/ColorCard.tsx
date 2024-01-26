"use client"

import React, { useState, useEffect } from 'react';
import { usePathname} from 'next/navigation';

export default function ColorCard({ colorOptions }: { colorOptions: string[] }) {
  const [selectedColor, setSelectedColor] = useState('');
  const pathname = usePathname();
  

  useEffect(() => {
    if (pathname) {
      const path = pathname.split('?')[1]?.split('=')[1]
      setSelectedColor(path);
    }
  }, [pathname]);

  return (
    <div className="flex items-center space-x-3">
      {colorOptions.map((colorOption: string, index: number) => (
        <label key={index} className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none">
          <input
            type="radio"
            name="color"
            value={colorOption}
            className="sr-only"
            id={`color-choice-${index}`}
            checked={selectedColor === colorOption}
            onChange={() => setSelectedColor(colorOption)}
          />
          <span
            aria-hidden="true"
            className={`h-8 w-8 rounded-full border ${selectedColor === colorOption ? 'ring ring-offset-1' : 'ring-5 ring-black '}`}
            style={{ backgroundColor: colorOption }}
          />
        </label>
      ))}
    </div>
  )
}
