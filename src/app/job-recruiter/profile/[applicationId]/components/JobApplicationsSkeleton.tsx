export function JobApplicationsSkeleton() {
    return (
      <>
      <div className="max-w-[1118px] mx-auto py-10 p-4 md:block hidden">
        <div className="shadow-xl py-3 border-black border-2 rounded-xl">
          {/* Grid Header */}
          <div className="grid py-10 grid-cols-4 place-items-center lg:text-2xl lg:leading-10 text-xl text-left font-semibold px-4 border-b border-black">
            <div className="col-span-1"><div className="h-8 w-40 bg-gray-200 rounded"/></div>
            <div><div className="h-8 w-32 bg-gray-200 rounded"/></div>
            <div><div className="h-8 w-32 bg-gray-200 rounded"/></div>
            <div><div className="h-8 w-36 bg-gray-200 rounded"/></div>
          </div>
  
          {/* Grid Body */}
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-4 my-8 text-base place-items-center lg:text-2xl text-[#FF6700] py-8 px-4 items-center bg-[#FFEADC]"
            >
              <div><div className="h-6 w-36 bg-gray-200 rounded"/></div>
              <div><div className="h-6 w-6 bg-gray-200 rounded-full"/></div>
              <div><div className="h-6 w-28 bg-gray-200 rounded"/></div>
              <div><div className="h-8 w-32 bg-gray-200 rounded"/></div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid block md:hidden grid-cols-5 my-8 mx-4 gap-5 py-8 px-4 items-center border-b border-gray-300 bg-gray-100 animate-pulse">
      <div className="col-span-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="col-span-2">
        <div className="flex justify-end">
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
      <div className="col-span-2"></div>
    </div>
      </>
    )
  }
  
  