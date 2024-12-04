

import JobCard from "../components/JobCard";
; // Adjust the path as necessary

import AccessCard from "./AccessCard";
import login from "../../../assests/login.png";
import learnMore from "../../../assests/learnMore.png";
import folow from "../../../assests/followNow.png";
import PaginationButton from "./PaginationButton";
import SkeletonJobCard from "../../jobs/components/SkeletonJobCard";

interface Job {
	_id: string;
	title: string;
	company: string;
	location: string;
	salary: { minSalary: number; maxSalary: number };
	createdAt: string;
	typeOfJob: string;
	slug: string
  }
  
  interface JobListProps {
	jobs: Job[];
	page: number;
	totalPages: number;
	loading: boolean;
  }
  
  const JobList: React.FC<JobListProps> = ({ jobs, page, totalPages, loading }) => {
	

	// const handlePageChange = (newPage: number) => {
	// 	// setPage(newPage);

	// 	const params = new URLSearchParams(window.location.search);

	// 	// Set the new page parameter
	// 	params.set("page", newPage.toString()); // This will add or update the page parameter

	// 	// Construct the new URL with the existing parameters and the updated page parameter
	// 	const newUrl = `${window.location.pathname}?${params.toString()}`;

	// 	// Update the route with the new URL
	// 	router.push(newUrl);
	// 	// Updates the URL without a full page reload
	// };

	// useEffect(() => {
	// 	// Sync the page from URL on first load
	// 	const queryPage = new URLSearchParams(window.location.search).get("page");
	// 	if (queryPage) {
	// 		setPage(Number.parseInt(queryPage, 10));
	// 	}
	// }, [setPage]);

	if (!jobs || (!jobs.length && !loading)) {
		return <p>no data found</p>;
	}
	return (
		
		<div className="p-4 max-w-[1400px] mx-auto">
			
			{loading ? (
            // Render skeleton cards when loading
            Array.from({ length: 5 }).map((_, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<SkeletonJobCard key={index} />
            ))
          ) : (
				<>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3">
						<div className="col-span-2 place-content-start grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1">
							{jobs.map((job) => (
								<JobCard key={job._id} job={job} />
							))}
						</div>
						<div className="col-span-1 flex flex-col gap-8">
							<AccessCard
								className=""
								title="Want Full Access?"
								buttonText="Login Now"
								message="Please log in to view full job 
details, and apply job 
that you want. "
								
								imgUrl={login.src}
							/>

							<AccessCard
								title="Scam Alert"
								className="md:block hidden"
								buttonText="Learn More"
								message="Stay Safe Online !
Beware of fake job offers. Verify 
the job details and company 
before sharing any 
personal information. "
								
								imgUrl={learnMore.src}
							/>

							<AccessCard
								title="Follow Companies"
								className="md:block hidden"
								buttonText="Follow Now"
								message="Follow Your Favorite Companies !
Stay updated on new job 
postings and company news 
by following businesses 
you're interested in. "
								
								imgUrl={folow.src}
							/>
						</div>
					</div>
					<div className="flex gap-5 justify-center mt-4 pt-5">
						<PaginationButton
						page={page-1}
							// onClick={() => handlePageChange(page - 1)}
							disabled={page === 1}
							className="px-4 py-2 rounded disabled:opacity-50"
               aria-label="Previous page"
						>
							<svg
								width="15"
								height="29"
								viewBox="0 0 15 29"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Arrow Icon</title>
								<path
									d="M14.1189 2.25112L2.9763 13.5727C2.73192 13.8197 2.59485 14.1531 2.59485 14.5006C2.59485 14.8481 2.73192 15.1816 2.9763 15.4286L14.1165 26.7501C14.3607 26.9987 14.4976 27.3332 14.4976 27.6817C14.4976 28.0302 14.3607 28.3647 14.1165 28.6133C13.9971 28.7357 13.8545 28.833 13.697 28.8994C13.5395 28.9658 13.3703 29 13.1994 29C13.0285 29 12.8593 28.9658 12.7018 28.8994C12.5443 28.833 12.4016 28.7357 12.2823 28.6133L1.14216 17.2942C0.410131 16.5486 0 15.5455 0 14.5006C0 13.4558 0.410131 12.4526 1.14216 11.7071L12.2823 0.387956C12.4017 0.265191 12.5444 0.167605 12.7022 0.100969C12.8599 0.0343329 13.0294 0 13.2006 0C13.3718 0 13.5413 0.0343329 13.699 0.100969C13.8568 0.167605 13.9995 0.265191 14.1189 0.387956C14.3631 0.636511 14.5 0.971054 14.5 1.31954C14.5 1.66802 14.3631 2.00256 14.1189 2.25112Z"
									fill="#14140F"
								/>
							</svg>
						</PaginationButton>
						{[...Array(totalPages)].map((_, index) => {
							const pageIndex = index + 1;
							return (
								<PaginationButton
								disabled={false}
									key={pageIndex}
									page={pageIndex}
									// onClick={() => handlePageChange(pageIndex)}
									className={`px-4 py-2 mx-1 rounded text-2xl ${
										page === pageIndex ? "bg-[#0068FF] text-white" : ""
									}`}
								>
									{pageIndex}
								</PaginationButton>
							);
						})}
						<PaginationButton
						page={page+1}
							// onClick={() => handlePageChange(page + 1)}
							disabled={page === totalPages}
							className="px-4 py-2 rounded disabled:opacity-50"
						>
							<svg
								width="15"
								height="29"
								viewBox="0 0 15 29"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Arrow Icon</title>
								<path
									d="M0.381114 2.25112L11.5237 13.5727C11.7681 13.8197 11.9052 14.1531 11.9052 14.5006C11.9052 14.8481 11.7681 15.1816 11.5237 15.4286L0.383532 26.7501C0.139279 26.9987 0.00241661 27.3332 0.00241661 27.6817C0.00241661 28.0302 0.139279 28.3647 0.383532 28.6133C0.502852 28.7357 0.645465 28.833 0.802966 28.8994C0.960467 28.9658 1.12967 29 1.3006 29C1.47153 29 1.64074 28.9658 1.79824 28.8994C1.95574 28.833 2.09835 28.7357 2.21767 28.6133L13.3578 17.2942C14.0899 16.5486 14.5 15.5455 14.5 14.5006C14.5 13.4558 14.0899 12.4526 13.3578 11.7071L2.21767 0.387956C2.09831 0.265191 1.95555 0.167605 1.79783 0.100969C1.6401 0.0343329 1.47062 0 1.29939 0C1.12817 0 0.958687 0.0343329 0.800961 0.100969C0.643237 0.167605 0.500472 0.265191 0.381114 0.387956C0.136862 0.636511 -9.53674e-07 0.971054 -9.53674e-07 1.31954C-9.53674e-07 1.66802 0.136862 2.00256 0.381114 2.25112Z"
									fill="#14140F"
								/>
							</svg>
						</PaginationButton>
					</div>
				</>
			)}
		</div>
	);
};

export default JobList;
