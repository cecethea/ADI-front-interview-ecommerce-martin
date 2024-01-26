"use client"
import { useState } from 'react';

export default function Page({ storageOptions, inStock }: { storageOptions: string[], inStock: boolean }) {
    const [activeOption, setActiveOption] = useState<string | null>(null);
    const [checkedOption, setCheckedOption] = useState<string | null>(null);

    return (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {storageOptions.map((storageOption, index) => {
                const isActive = storageOption === activeOption;
                const isChecked = storageOption === checkedOption;
                const isAvailable = inStock;

                return (
                    <label
                        key={index}
                        className={`flex items-center justify-center rounded-md ring-1 ring-black py-3 px-3 text-sm font-medium uppercase sm:flex-1 focus:outline-none
                            ${isAvailable ? 'cursor-pointer' : 'opacity-25 cursor-not-allowed'}
                            ${isActive ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}
                            ${isChecked ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700' : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'}`}
                        onMouseEnter={() => setActiveOption(storageOption)}
                        onMouseLeave={() => setActiveOption(null)}
                    >
                        <input
                            type="radio"
                            name="storage"
                            value={storageOption}
                            className="sr-only"
                            aria-labelledby={`size-choice-${index}-label`}
                            checked={isChecked}
                            onChange={() => setCheckedOption(storageOption)}
                            disabled={!isAvailable}
                        />
                        <span id={`storage-choice-${index}-label`} className={`block text-center ${isChecked ? 'text-white' : 'text-gray-900'}`}>
                            {storageOption}
                        </span>
                    </label>
                );
            })}
        </div>
    );
}