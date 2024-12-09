// ExploreRoles.js
import Image from 'next/image';
import technoloy from '../../assests/technolgy.svg'
import notification from '../../assests/notification.svg'
import buisness from '../../assests/buisness.svg'
import accounts from '../../assests/accounts.svg'
import creative from '../../assests/Creative.svg'
import hr from '../../assests/hr.svg'
import legal from '../../assests/legal.svg'
import heatlhcare from '../../assests/healthCare.svg'
import markting from '../../assests/market.svg'
import Link from 'next/link';

// rolesData.js
export const rolesData = [
    { name: "Technology", icon:technoloy, link:"/find-jobs/jobs?industry=Technology" },
    { name: "Business", icon: buisness,link:"/find-jobs/jobs?industry=Business" },
    { name: "Account", icon: accounts,link:"/find-jobs/jobs?industry=Account" },
    { name: "Creative", icon: creative ,link:"/find-jobs/jobs?industry=Creative" },
    { name: "Human Resource", icon:hr,link:"/find-jobs/jobs?industry=Human Resource"},
    { name: "Legal", icon: legal ,link:"/find-jobs/jobs?industry=Legal"},
    { name: "Healthcare", icon: heatlhcare,link:"/find-jobs/jobs?industry=Healthcare" },
    { name: "Marketing", icon: markting ,link:"/find-jobs/jobs?industry=Marketing"},
  ];
  
export default function ExploreRoles() {
  return (
    <div className="flex flex-col items-center text-center lg:text-left bg-blue-600 px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-2">Explore Top Roles</h1>
      <p className="mb-6 pb-6 text-lg">Find the Perfect Role That Matches Your Ambition!</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-1 place-items-center lg:grid-cols-3  lg:gap-8 w-full max-w-[1400px] mx-auto">
       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 col-span-2 gap-7">
       {rolesData.map((role, index) => (
         // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Link href={role.link} key={index}>
          <div
           
           
            className="flex items-center gap-4  bg-white text-black rounded-lg shadow-md p-4 text-center font-semibold transition-transform transform hover:scale-101"
          >
            <Image src={role.icon} alt={`${role.name} icon`}  />
           <p className='md:text-3xl text-xl '>{role.name}</p> 
          </div>
          </Link>
        ))}
       </div>


       <div className=" bg-white mt-10 lg:mt-0 p-4 mx-auto rounded-lg text-black w-full lg:max-w-[336px] h-full text-center shadow-md">
        <Image src={notification} alt="Notification icon" className="mx-auto  mb-2" />
        <h2 className="text-3xl font-semibold">Never Miss a Job Opportunity!</h2>
        <p className="text-base mb-4">
          Sign up to get instant notifications whenever new jobs are posted. Stay ahead in your career search!
        </p>
        <input
          type="text"
          placeholder="Enter your Contact number..."
          className="w-full p-2 mb-4 border border-[#B6B6B6] rounded px-3 py-4  placeholder:text-[#B6B6B6]"
        />
        <button type='button' className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded w-full hover:bg-yellow-600">
          Notify Me
        </button>
      </div>


      </div>
      
    
    </div>
  );
}
