"use client"; 
import React from 'react';

export default function NoteInput({
  value,
  onChange,
  placeholder = "Add a note...",
  maxLength = 200
}) {
  return (
    <div className="my-4">
      <label htmlFor="noteInput" className="block text-sm font-medium text-gray-700 mb-1">
        Note (Optional)
      </label>
      <textarea
        id="noteInput"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={3}
        className="
          w-full p-3 border border-gray-300 rounded-lg shadow-sm text-gray-700
          focus:ring-indigo-500 focus:border-indigo-500
          transition duration-150 ease-in-out
          resize-none
        "
      />
      {maxLength && (
         <p className="text-right text-xs text-gray-700 mt-1">
           {value.length}/{maxLength}
         </p>
       )}
    </div>
  );
}