
import Image from "next/image";
import company from '../../../assests/Group 517.svg'
import addressImg from '../../../assests/Group 517 (1).svg'
interface CompanyInfoProps {
  name: string;
  website?: string;
  address: string;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ name, website, address }) => {
  return (
    <div className="p-4 bg-white  border-b border-black">
      <h2 className="md:text-3xl text-xl font-medium pt-5 pb-8">About Company</h2>

      <div className="flex items-center pb-8">
        <div className=" mr-3">
          <Image src={company} alt="Company Icon" className="w-[50px] md:w-auto"  />
        </div>
        <div>
          <h3 className="md:text-[28px] text-sm font-semibold">Company Name</h3>
          {website ? (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 md:text-xl text-sm underline"
            >
              company’s website if any
            </a>
          ) : (
            <p className="text-gray-500 text-sm">No website available</p>
          )}
        </div>
      </div>

      <div className="flex items-center pb-8">
        <div className="w-[60%] md:w-auto md:mr-3">
          <Image src={addressImg} alt="Address Icon" className="w-[50px] md:w-auto" />
        </div>
        <div>
          <h3 className="md:text-[28px] text-sm font-semibold">Company Address</h3>
          <p className="text-blue-500 md:text-xl text-sm">{address}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
