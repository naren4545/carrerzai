import Header from "../../../app/components/Header";
import Wrapper from "./components/Wrapper";
import Footer from "../../../app/components/Footer";
import LoadingJob from "./components/LoadingJob";
import { NextResponse } from "next/server";
import { Suspense } from "react";


export default async function Page() {
	return (
		<div>
			<Header />
			<Suspense fallback={<LoadingJob />}>
				<Wrapper  />
				</Suspense>
			
			<Footer />
		</div>
	);
}
