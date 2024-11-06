// components/AccessCard.tsx
import React from 'react';

interface AccessCardProps {
  title: string;
  message: string;
  buttonText: string;
 imgUrl:String
  onButtonClick: () => void;
}

const AccessCard: React.FC<AccessCardProps> = ({ title, message, buttonText, onButtonClick,imgUrl }) => {
  return (
    <div className="max-w-xs py-8 h-fit bg-white border text-center mx-auto border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-medium text-center mb-2">{title}</h2>
      <hr className='border-black'></hr>
      <div className="flex justify-center mb-4">
        <div className=" flex items-center justify-center  rounded-full">
          {/* Icon placeholder, use any SVG or icon here */}
          <img src={imgUrl}  className='pt-8'/>
        </div>
      </div>
      <p className="text-center text-xl px-2 pt-5 mb-4 max-w-[278px] mx-auto">{message}</p>
      <button
        onClick={onButtonClick}
        className="px-5 py-3 mx-auto text-2xl text-white bg-[#FFBA00] shadow-xl rounded-md hover:bg-yellow-600"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default AccessCard;
