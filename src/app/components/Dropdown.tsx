// components/JobOptionsGrid.js
import { FaSearch, FaMapMarkerAlt, FaHome, FaChartLine, FaListUl, FaCity } from 'react-icons/fa';

const JobOptionsGrid = () => {
  const options = [
    {
      icon: <FaSearch className="text-white w-6 h-6" />,
      title: "Search Jobs",
      description: "Job title, keywords or skills",
    },
    {
      icon: <FaMapMarkerAlt className="text-white w-6 h-6" />,
      title: "Jobs Near Me",
      description: "Jobs in your city",
    },
    {
      icon: <FaHome className="text-white w-6 h-6" />,
      title: "Remote Jobs",
      description: "Companies hiring remotely",
    },
    {
      icon: <FaListUl className="text-white w-6 h-6" />,
      title: "Top Job Titles",
      description: "Most searched for job titles",
    },
    {
      icon: <FaChartLine className="text-white w-6 h-6" />,
      title: "Trending Skills",
      description: "Currently trending skills",
    },
    {
      icon: <FaCity className="text-white w-6 h-6" />,
      title: "Top Job Locations",
      description: "Jobs in popular cities",
    },
  ];

  return (
    <div className='absolute hidden bg-white border border-gray-300 rounded-md shadow-lg top-full left-0 w-[734px] max-w-[734px] z-10 group-hover:block transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100'>
    <div className="bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-4 p-2  rounded-lg  transition-shadow">
          <div className="bg-blue-500 p-3 rounded-full">
            {option.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{option.title}</h3>
            <p className="text-gray-500 text-base">{option.description}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default JobOptionsGrid;
