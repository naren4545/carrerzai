

const ProTipsSection: React.FC = () => {
  return (
    <section className="flex py-20 flex-col items-center justify-center bg-blue-600 text-white  px-4">
      <h2 className="md:text-5xl text-xl font-bold mb-2 text-center">Get Pro Tips to Stand Out!</h2>
      <p className="text-center md:text-[28px] md:leading-9 text-sm mb-4 max-w-[740px] mx-auto font-normal pb-10">
        Unlock expert advice on how to enhance your profile and land the perfect job. Need personalized tips? 
        Our experts are just an email away!
      </p>
      <div className="flex flex-col md:flex-row w-full rounded-xl px-3 max-w-[980px] items-center md:bg-white h-[90px]">
        <input
          type="email"
          placeholder="Enter your Email ID..."
          className="flex-1 placeholder:md:text-2xl placeholder:text-[10px] px-4 py-2 mb-2 sm:mb-0 sm:mr-2 rounded-md outline-none text-gray-700"
        />
        <button type='button' className="bg-[#FFBA00] text-white font-medium md:text-3xl text-sm px-5 py-3 rounded-md hover:bg-yellow-500">
          Get Expert Tips
        </button>
      </div>
    </section>
  );
};

export default ProTipsSection;
