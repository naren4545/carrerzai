import Image from "next/image";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SearchJob from "./components/SearchJob";
import InfoSection from "./components/InfoSection";
import HowItWorks from "./components/HowItWorks";
import FAQComponent from "./components/FAQComponent";
import Footer from "./components/Footer";
import RedirectIfJobSeeker from "./components/RedirectIfJobSeeker";
import CheckToken from "./components/CheckToken";
export default function Home() {



// RedirectIfJobSeeker(jobSekker)
	return (
		<>
     <CheckToken/>
			 <Header />
			<HeroSection />
			<SearchJob />
			<InfoSection />
			<HowItWorks />
			<FAQComponent />
			<Footer />
		</>
	);
}
