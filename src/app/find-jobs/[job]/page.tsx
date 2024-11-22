import Header from "../../components/Header";
import JobRender from "./components/jobRender";
import Footer from "../../components/Footer";
import ProTipsSection from "@/app/components/ProTips";
import { cookies } from "next/headers"; // Import cookies helper for server-side

interface JobPageProps {
  params: any;
}

const JobPage = async ({ params }: JobPageProps) => {
  const { job } =await params;

  // Get the token from cookies
  const pinqueryToken = await cookies().get("pinquery_token")?.value;
console.log(pinqueryToken+"test")
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
