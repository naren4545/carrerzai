

import Header from "../../../app/components/Header";
import Wrapper from "./components/Wrapper";
import Footer from "../../../app/components/Footer";
import LoadingJob from "./components/LoadingJob";
import { NextResponse } from "next/server";
import { Suspense } from "react";

interface PageProps {
	searchParams: Record<string, string | undefined>;
  }
  export default async function Page({ searchParams }: PageProps) {

  


  return (
		<div>
			
			<Header />
      <Suspense fallback={<LoadingJob/>}>
			<Wrapper searchParams={searchParams}/>
			</Suspense>
      <Footer />
		</div>
	);
}