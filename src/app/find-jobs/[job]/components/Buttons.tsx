import React from 'react'

export default function Buttons() {
  return (
    <div className='p-6 py-16'>
      <div className="flex flex-row justify-center  gap-3 md:text-2xl text-sm">
          <button className="text-blue-600 border md:min-w-[250px] min-w-[127px]  border-blue-600 px-7 py-2 rounded md:mb-2">
            View Details
          </button>
          <button className="bg-blue-600 md:min-w-[250px] min-w-[127px] text-white px-7 py-2 rounded">
            Apply
          </button>
        </div>
    </div>
  )
}
