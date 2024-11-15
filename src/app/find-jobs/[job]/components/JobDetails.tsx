// JobDetails.tsx


interface JobDetailsProps {
  openings: number;
  applicants: number;
  about: string;
  responsibilities: string[];
}

const JobDetails: React.FC<JobDetailsProps> = ({ openings, applicants, about, responsibilities }) => {
  return (
    
    <div className="p-6 py-8  mx-auto">
      {/* Job Highlights */}
      <div className='bg-[#A6CBFF] p-4 rounded-lg mb-6'>
        <div className=" font-medium flex items-center w-full mb-3 py-4">
          <span className="md:text-[32px] text-sm mr-2">•</span>
          <span className='md:text-[32px] text-sm'>Job Highlights</span>
        </div>
        <div className=" p-4 rounded-lg  flex items-center justify-between">

        <div className="flex space-x-4 w-full justify-between md:text-[32px] text-[10px]">
          <div className=" font-medium">No of Openings: {openings}</div>
          <div className=" font-medium flex items-center">
          <svg className='mr-2 md:w-auto w-[16px]' width="42" height="30" viewBox="0 0 42 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>Applicants</title>
<path d="M13.7087 15C17.7368 15 21.0003 11.7364 21.0003 7.70829C21.0003 3.68017 17.7368 0.416626 13.7087 0.416626C9.68053 0.416626 6.41699 3.68017 6.41699 7.70829C6.41699 11.7364 9.68053 15 13.7087 15ZM36.6253 11.3541C36.6253 14.5198 34.0618 17.0833 30.8962 17.0833C29.3767 17.0833 27.9195 16.4797 26.845 15.4053C25.7706 14.3308 25.167 12.8736 25.167 11.3541C25.167 8.1885 27.7305 5.62496 30.8962 5.62496C34.0618 5.62496 36.6253 8.1885 36.6253 11.3541ZM13.7087 17.0833C16.5566 17.0833 21.191 17.9697 24.2305 19.7343C25.4722 20.9979 26.2087 22.376 26.2087 23.75V29.5833H0.166992V23.75C0.166992 19.3166 9.18887 17.0833 13.7087 17.0833ZM41.8337 29.5833H28.292V23.75C28.292 22.275 27.7597 20.9166 26.9128 19.7052C28.518 19.3468 30.0982 19.1666 31.3055 19.1666C35.1878 19.1666 41.8337 21.0281 41.8337 24.7218V29.5833Z" fill="#0068FF"/>
</svg>
            {applicants} Applicants Applied
          </div>
        </div>
      </div>
      </div>
      {/* About the Job */}
      <section className="mb-6">
        <h2 className="md:text-[32px] text-xl font-medium mb-2">About the Job</h2>
        <p className="md:text-2xl text-sm">{about}</p>
      </section>

      {/* Key Responsibilities */}
      <section>
        <h2 className="md:text-[32px] text-xl font-medium mb-2">Key Responsibilities</h2>
        <ul className="list-decimal pl-8  space-y-2 font-normal md:text-2xl text-sm">
          {responsibilities.map((responsibility, index) => (
            <li className='' key={ index}>{responsibility}</li>
          ))}
        </ul>
      </section>
    </div>
    
  );
};

export default JobDetails;
