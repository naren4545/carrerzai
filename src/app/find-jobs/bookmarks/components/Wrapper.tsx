
import JobList from '../../jobs/components/JobsSection';

import { cookies } from 'next/headers'; // Import cookies helper

async function fetchData(searchParams) {
  // Retrieve the token from cookies
  const pinqueryToken =await cookies().get('pinquery_token')?.value;
console.log(pinqueryToken+"test")
  // Determine the API endpoint based on token presence
  const endpoint = "https://www.careerzai.com/v1/profile/jobs/bookmarks";

  // Extract search parameters
  
  const location = await searchParams?.location || '';
  const page =await searchParams?.page || 1;
  const skilltag =await searchParams?.skilltag || '';

  // Perform the fetch request with or without the token
  const response = await fetch(
    `${endpoint}?location=${location}&page=${page}&skilltag=${skilltag}&limit=5`,
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
  return data;
}

export default async function Wrapper({ searchParams }) {
  try {
    const { bookmarks, currentPage, totalPages } = await fetchData(searchParams);
   const data=await fetchData(searchParams);
console.log(data)
    return (
      <div>
     
        <JobList jobs={ bookmarks} page={currentPage} totalPages={totalPages} loading={false} />
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
