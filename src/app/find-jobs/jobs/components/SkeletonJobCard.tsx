import React from 'react';

const SkeletonJobCard: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 shadow-md h-fit bg-white max-w-[905px]">
      <div className="flex justify-between items-center mb-3">
        <div className='flex gap-5'>
          <div className="w-[36px] h-[36px] bg-gray-200 rounded-full animate-pulse"/>
          <div>
            <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"/>
            <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"/>
          </div>
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"/>
      </div>

      <hr className="my-2" />

      <div className="flex justify-between md:flex-row flex-col md:items-center py-5 px-3">
        <div className="md:text-2xl text-sm font-normal">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex items-center gap-3 pb-4">
              <div className='w-[40px] h-[40px] bg-gray-200 rounded animate-pulse'/>
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"/>
            </div>
          ))}
        </div>

        <div className="flex flex-row md:flex-col gap-3 md:text-2xl text-sm">
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"/>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"/>
        </div>
      </div>

      <div className="mt-3 md:text-xl text-[10px] flex items-center gap-5">
        <div className="h-8 bg-gray-200 rounded w-40 animate-pulse"/>
        <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"/>
      </div>
    </div>
  );
};

export default SkeletonJobCard;

