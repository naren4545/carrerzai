
"use client";
import Header from "../../../app/components/Header";
import Wrapper from "./components/Wrapper";
import Footer from "../../../app/components/Footer";
import LoadingJob from "../jobs/components/LoadingJob";

import { Suspense } from "react";


  export default  function Page() {

  


  return (
		<div>
			
			<Header />
			
			<Wrapper />
			
      <Footer />
		</div>
	);
}
