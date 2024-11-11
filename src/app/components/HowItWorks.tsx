
import Cyp from "../assests/CreateYourProfile.svg"
import Image from 'next/image';


const data1=[{
  img: Cyp,
   title: "Create Your Profile",
   description: "Sign up and complete your profile to get personalized job recommendations."
 },

 {
  img: Cyp,
   title: "Search for Jobs",
   description: "Use filters to find job openings that match your skills and preferences."
 },
 {
   img: Cyp,
   title: "Apply with Ease",
   description: "Submit applications quickly and track your progress through the hiring process."
 },
 {
   img: Cyp,
   title: "Get Hired",
   description: "Connect with employers and secure your next career opportunity."
 },
 
]

const data2=[{
  img: Cyp,
   title: "Register Your Company",
   description: "Create a company profile and start posting job openings in minutes."
 },

 {
  img: Cyp,
   title: "Post a Job",
   description: "List job requirements and attract the right candidates to your vacancies."
 },
 {
   img: Cyp,
   title: "Review Applicants",
   description: "Filter applications, view candi-date profiles, and communicate directly with top talent."
 },
 {
   img: Cyp,
   title: "Hire the Best",
   description: "Select the ideal candidate and make your next great hire with confidence."
 },
 
]

const HowItWorks: React.FC = () => {
  return (
    <section>


    <div className='pb-10 text-center'>

      <h2 className='md:text-[36px] text-xl font-semibold'>Your Path to Success Starts Here</h2>
      <p className='md:text-2xl text-sm'>Discover how our platform works to connect opportunities and <br/>
      build careers effortlessly.</p>
    </div>
    <div className="grid grid-cols-1 px-3 pb-8 pt-4 md:grid-cols-2 lg:grid-cols-5 gap-1 max-w-[1400px] w-full mx-auto">

      <div className='flex h-full items-center pr-4 w-[50%] lg:w-fit pb-5' >
        <h2 className='md:text-5xl text-xl w-full font-py relative lg:w-fit text-center lg:text-left'>Job Seekers

        <div className='bg-[linear-gradient(180deg,_transparent_50%,_#FFBA00_100%)] absolute w-full h-[50px] bottom-[-6px]'/>
        </h2>
      </div>
          {data1.map(({ img, title, description },index) => (
            <div key={title} className="flex lg:flex-col  text-left w-[63%] ml-auto lg:w-fit">
             <div className='flex flex-col lg:items-center gap-1 lg:flex-row lg:w-full w-[25%] '>
              <Image src={img} className='w-[56px] md:w-fit'alt=''/>
             {index===3?"": <div className='lg:border-b border-r ml-[25px] md:ml-0 lg:w-full w-[1px] border-[#B6B6B6] lg:h-fit h-[50px]'/>}
              </div>
              <div className='lg:w-ful w-[75%]'>
              <h4 className="font-semibold md:text-2xl text-sm font-py py-5">{title}</h4>
              <p className=" md:text-base text-xs">{description}</p>
              </div>
            </div>
          ))}
        </div>




        <div className="grid grid-cols-1 px-3 md:grid-cols-2 lg:grid-cols-5 gap-1 max-w-[1400px] w-full mx-auto">
        <div className='flex w-[50%] ml-auto h-full items-center justify-end pr-4 lg:hidden' >
  <h2 className='md:text-5xl text-xl font-py relative w-full text-center'>Recruiters

  <div className='bg-[linear-gradient(180deg,_transparent_50%,_#FFBA00_100%)] absolute w-full h-[50px] bottom-[-6px]'/>
  </h2>
</div>

    {data2.map(({ img, title, description },index) => (
            <div key={title} className="flex lg:flex-col  text-left w-[63%] mr-auto lg:w-fit">
             <div className='flex flex-col lg:items-center gap-1 lg:flex-row lg:w-full w-[25%] '>
              <Image src={img} className='w-[56px] md:w-fit'alt=''/>
             {index===3?"": <div className='lg:border-b border-r ml-[25px] md:ml-0 lg:w-full w-[1px] border-[#B6B6B6] lg:h-fit h-[50px]'/>}
              </div>
              <div className='lg:w-ful w-[75%]'>
              <h4 className="font-semibold md:text-2xl text-sm font-py py-5">{title}</h4>
              <p className=" md:text-base text-xs">{description}</p>
              </div>
            </div>
          ))}



<div className='lg:flex hidden h-full items-center pr-4' >
  <h2 className='text-5xl font-py relative w-fit'>Recruiters

  <div className='bg-[linear-gradient(180deg,_transparent_50%,_#FFBA00_100%)] absolute w-full h-[50px] bottom-[-6px]'/>
  </h2>
</div>
  </div>

</section>
  )
};

export default HowItWorks;
