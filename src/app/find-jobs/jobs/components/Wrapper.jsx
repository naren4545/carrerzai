
import JobList from './JobsSection';

import { cookies } from 'next/headers'; // Import cookies helper

async function fetchData(searchParams) {
  // Retrieve the token from cookies
  const pinqueryToken =await cookies().get('pinquery_token')?.value;

  // Determine the API endpoint based on token presence
  const endpoint = pinqueryToken
    ? 'https://www.careerzai.com/v1/job/filtered'
    : 'https://www.careerzai.com/v1/job/filtered';

  // Extract search parameters
  console.log(pinqueryToken+"test")
  const location = await searchParams?.location || '';
  const page =await searchParams?.page || 1;
  const skilltag =await searchParams?.skilltag || '';
const industry =await searchParams?.industry || '';
  // Perform the fetch request with or without the token
  const response = await fetch(
    `${endpoint}?location=${location}&page=${page}&skilltag=${skilltag}&industry=${industry}&limit=10`,
    {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        ...(pinqueryToken && { Authorization: `Bearer ${pinqueryToken}` }), // Include token if it exists
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(data,"hii")
  return data;
}

export default async function Wrapper({ searchParams }) {
  try {
    const { jobs, currentPage, totalPages } = await fetchData(searchParams);
   
console.log(currentPage, totalPages)
    return (
      <div >
        
        <JobList jobs={jobs} page={currentPage} totalPages={totalPages} loading={false} />
      </div>
    );
  } catch (error) {
    console.error("Error:", error.message);

    return (
      <div>
        <p>Error fetching jobs data: {error.message}</p>
      </div>
    );
  }
}