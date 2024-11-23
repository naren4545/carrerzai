import Header from "../../components/Header";
import JobRender from "./components/jobRender";
import Footer from "../../components/Footer";
import ProTipsSection from "@/app/components/ProTips";
import { cookies } from "next/headers";

interface JobPageProps {
  params: any; // Explicitly type 'job' as a string
}

const JobPage = async ({ params }: JobPageProps) => {
  const { job } = params;

  // Access the cookies object
  const cookieStore = await cookies(); // No need to use await, it's synchronous
  const cookie = cookieStore.get("pinquery_token"); // Get the cookie object

  const pinqueryToken = cookie?.value; // Safely extract the value if the cookie exists

  console.log(`Token: ${pinqueryToken}`);

  // Select the appropriate endpoint based on token presence
  const endpoint = pinqueryToken
    ? `https://www.careerzai.com/v1/job/user/slug/${job}`
    : `https://www.careerzai.com/v1/job/slug/${job}`;

  // Fetch the data with or without the token
  const res = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      ...(pinqueryToken && { Authorization: `Bearer ${pinqueryToken}` }), // Attach token if it exists
    },
    cache: "no-store", // Ensures no caching
  });

  if (!res.ok) {
    throw new Error(`Error fetching data: ${res.statusText}`);
  }

  const data = await res.json();

  return (
    <>
      <Header />
      <div className="py-10">
        <JobRender job={data} />
      </div>
      <ProTipsSection />
      <Footer />
    </>
  );
};

export default JobPage;
