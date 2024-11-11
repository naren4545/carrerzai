// components/AccessCard.tsx


interface AccessCardProps {
  title: string;
  message: string;
  buttonText: string;
 imgUrl:string
 className:string
  onButtonClick: () => void;
}

const AccessCard: React.FC<AccessCardProps> = ({ className="",title, message, buttonText, onButtonClick,imgUrl }) => {
  return (
    <div className={`md:max-w-xs w-full py-8 h-fit bg-white border text-center mx-auto border-gray-200 rounded-lg shadow-md ${className}`}>
      <h2 className="text-2xl font-medium text-center mb-2">{title}</h2>
      <hr className='border-black'/>
      <div className="flex justify-center mb-4">
        <div className=" flex items-center justify-center  rounded-full">
          {/* Icon placeholder, use any SVG or icon here */}
          <img src={imgUrl} alt="Icon"  className='pt-8'/>
        </div>
      </div>
      <p className="text-center text-xl px-2 pt-5 mb-4 max-w-[278px] mx-auto">{message}</p>
      <button
      type="button"
        onClick={onButtonClick}
        className="px-5 py-3 mx-auto text-2xl text-white bg-[#FFBA00] shadow-xl rounded-md hover:bg-yellow-600"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default AccessCard;
