import React from 'react';

const SubscribeForm = () => {
  return (
    <div className="bg-black text-white py-10">
      <div className="max-w-[1400px] mx-auto border-b border-[#FFFFFF40] pb-10">
        <div className="grid md:grid-cols-2 gap-4 items-center px-3">
          {/* Text Section */}
          <div className="max-w-[627px] lg:text-left text-center">
            <h2 className="md:text-5xl text-xl  font-medium mb-4 lg:leading-[72px] max-w-[474px]">Stay Updated, Stay Connected</h2>
            <p className="mb-4 md:text-2xl text-xs">
              Join our community and get weekly updates on top job opportunities, 
              industry trends, and expert career tips. Be the first to know what's 
              new on Careerzai!
            </p>
          </div>
          {/* Form Section */}
          <div className="md:col-span-1">
            <form className="flex flex-col gap-5">
              <input 
                type="text" 
                placeholder="Enter your Contact number..." 
                className="flex-grow p-3 h-[50px]  lg:h-[75px] rounded bg-[#FFFFFF41] text-white placeholder-gray-400"
              />
              <div className='flex justify-center'>
              <button 
                type="submit" 
                className="bg-gradient-to-r max-w-[188px] inline-block w-full mx-auto h-[58px] from-yellow-500 to-orange-500 text-white p-3 rounded hover:from-orange-500 hover:to-yellow-500"
              >
                Join Now
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeForm;
