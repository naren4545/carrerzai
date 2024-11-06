// JobsGrid.js
import Link from "next/link";
// jobsData.js
// jobsData.js
export const jobLocations = [
  { name: "Jobs in Mumbai", url: "/find-jobs/jobs?location=Mumbai" },
  { name: "Jobs in Delhi", url: "/find-jobs/jobs?location=Delhi" },
  { name: "Jobs in Pune", url: "/find-jobs/jobs?location=Pune" },
  // Add more locations as needed
];

export const jobIndustries = [
  { name: "Information Technology", url: "/find-jobs/jobs?industry=it" },
  { name: "Marketing", url: "/find-jobs/jobs?industry=marketing" },
  { name: "Account & Finance", url: "/find-jobs/jobs?industry=accounting" },
  // Add more industries as needed
];

export const jobCompanies = [
  { name: "Company A", url: "/find-jobs/jobs?company=company-a" },
  { name: "Company B", url: "/find-jobs/jobs?company=company-b" },
  { name: "Company C", url: "/find-jobs/jobs?company=company-c" },
  // Add more companies as needed
];



export default function JobsGrid() {
    return (
        <div className="px-6 py-10 max-w-[1400px] mx-auto">
            {/* Jobs by Location Section */}
            <div className="grid gap-10 py-10">
                <div className="mb-6 ">
                    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                        <div className="flex lg:flex-col items-center justify-between mb-2 lg:col-span-1 col-span-3">
                            <h2 className="lg:text-[36px] text-xl lg:leading-[54px] font-medium relative">
                                Jobs by Location
                                <div className='bg-[linear-gradient(180deg,_transparent_50%,_#FFBA00_100%)] absolute w-full lg:h-[30px] h-[15px] bottom-0 lg:bottom-[10px]'></div>
                            </h2>
                            <Link href="/find-jobs/jobs" className="lg:text-[32px] text-base lg:leading-[46px] text-[#B6B6B6] hover:text-blue-600 hover:underline">
                                View All
                                <svg className="inline ml-3 lg:w-auto  w-[12px]"  width="22" height="44" viewBox="0 0 22 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.49531 12.0633L6.44048 10.12L17.0353 20.7111C17.2061 20.8809 17.3416 21.0827 17.4341 21.305C17.5266 21.5272 17.5742 21.7656 17.5742 22.0064C17.5742 22.2472 17.5266 22.4855 17.4341 22.7078C17.3416 22.9301 17.2061 23.1319 17.0353 23.3016L6.44048 33.8983L4.49714 31.955L14.4411 22.0091L4.49531 12.0633Z" fill="#B6B6B6"/>
                                </svg>
                            </Link>
                        </div>
                        {jobLocations.map((location, index) => (
                            <div
                                key={index}
                                className="bg-[#A6CBFF] max-w-[280px] lg:text-[32px] text-xs lg:leading-[48px] flex items-center justify-center text-center py-2 px-4 rounded-md font-medium"
                            >
                                <Link href={location.url}>{location.name}</Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Jobs by Industry Section */}
                <div className="mb-6">
                    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                      
                    <div className="flex  lg:hidden justify-between lg:flex-col items-end mb-2 lg:col-span-1 col-span-3 ">
                            <h2 className="lg:text-[36px] text-xl lg:leading-[54px] font-medium relative">
                                Jobs by Industry
                                <div className='bg-[linear-gradient(180deg,_transparent_50%,_#FFBA00_100%)] absolute w-full lg:h-[30px] h-[15px] bottom-0 lg:bottom-[10px]'></div>
                            </h2>
                            <Link href="/find-jobs/jobs" className="lg:text-[32px] text-base lg:leading-[46px] text-[#B6B6B6] hover:text-blue-600 hover:underline">
                                View All
                                <svg className="inline ml-3 lg:w-auto  w-[12px]" width="22" height="44" viewBox="0 0 22 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.49531 12.0633L6.44048 10.12L17.0353 20.7111C17.2061 20.8809 17.3416 21.0827 17.4341 21.305C17.5266 21.5272 17.5742 21.7656 17.5742 22.0064C17.5742 22.2472 17.5266 22.4855 17.4341 22.7078C17.3416 22.9301 17.2061 23.1319 17.0353 23.3016L6.44048 33.8983L4.49714 31.955L14.4411 22.0091L4.49531 12.0633Z" fill="#B6B6B6"/>
                                </svg>
                            </Link>
                        </div>
                        {jobIndustries.map((industry, index) => (
                            <div
                                key={index}
                                className="bg-[#A6CBFF] max-w-[280px] lg:text-[32px] text-xs lg:leading-[48px] flex items-center justify-center text-center py-2 px-4 rounded-md font-medium"
                            >
                                <Link href={industry.url}>{industry.name}</Link>
                            </div>
                        ))}
                        <div className="lg:flex  hidden flex-col items-end mb-2 lg:col-span-1 col-span-3 ">
                            <h2 className="lg:text-[36px] text-xl lg:leading-[54px] font-medium relative">
                                Jobs by Industry
                                <div className='bg-[linear-gradient(180deg,_transparent_50%,_#FFBA00_100%)] absolute w-full h-[30px] bottom-[10px]'></div>
                            </h2>
                            <Link href="/find-jobs/jobs" className="lg:text-[32px] text-base lg:leading-[46px] text-[#B6B6B6] hover:text-blue-600 hover:underline">
                                View All
                                <svg className="inline ml-3" width="22" height="44" viewBox="0 0 22 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.49531 12.0633L6.44048 10.12L17.0353 20.7111C17.2061 20.8809 17.3416 21.0827 17.4341 21.305C17.5266 21.5272 17.5742 21.7656 17.5742 22.0064C17.5742 22.2472 17.5266 22.4855 17.4341 22.7078C17.3416 22.9301 17.2061 23.1319 17.0353 23.3016L6.44048 33.8983L4.49714 31.955L14.4411 22.0091L4.49531 12.0633Z" fill="#B6B6B6"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Jobs by Company Section */}
                <div>
                    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                       
                    <div className="flex lg:flex-col items-center justify-between mb-2 lg:col-span-1 col-span-3">
                            <h2 className="lg:text-[36px] text-xl lg:leading-[54px] font-medium relative">
                            Jobs by Company
                                <div className='bg-[linear-gradient(180deg,_transparent_50%,_#FFBA00_100%)] absolute w-full lg:h-[30px] h-[15px] bottom-0 lg:bottom-[10px]'></div>
                            </h2>
                            <Link href="/find-jobs/jobs" className="lg:text-[32px] text-base lg:leading-[46px] text-[#B6B6B6] hover:text-blue-600 hover:underline">
                                View All
                                <svg className="inline ml-3 lg:w-auto  w-[12px]"  width="22" height="44" viewBox="0 0 22 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.49531 12.0633L6.44048 10.12L17.0353 20.7111C17.2061 20.8809 17.3416 21.0827 17.4341 21.305C17.5266 21.5272 17.5742 21.7656 17.5742 22.0064C17.5742 22.2472 17.5266 22.4855 17.4341 22.7078C17.3416 22.9301 17.2061 23.1319 17.0353 23.3016L6.44048 33.8983L4.49714 31.955L14.4411 22.0091L4.49531 12.0633Z" fill="#B6B6B6"/>
                                </svg>
                            </Link>
                        </div>
                       
                        

                        {jobCompanies.map((company, index) => (
                            <div
                                key={index}
                                className="bg-[#A6CBFF] max-w-[280px] lg:text-[32px] text-xs lg:leading-[48px] flex items-center justify-center text-center py-2 px-4 rounded-md font-medium"
                            >
                                <Link href={company.url}>{company.name}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
