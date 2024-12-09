

import Header from "../../../app/components/Header";
import Wrapper from "./components/Wrapper";
import Footer from "../../../app/components/Footer";
import LoadingJob from "./components/LoadingJob";
import { NextResponse } from "next/server";
import { Suspense } from "react";
import HeroSection from './components/HeroSection';

export default  function Page({ searchParams }: { searchParams: any }) {
	return (
		<div key={Math.random()}>
			<Header />
			<HeroSection/>
			<Suspense fallback={<LoadingJob />}>
				<Wrapper searchParams={searchParams} />
				</Suspense>
			
			<Footer />
		</div>
	);
}
