import Image from "next/image";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SearchJob from "./components/SearchJob";
import InfoSection from "./components/InfoSection";
import HowItWorks from "./components/HowItWorks";
import FAQComponent from "./components/FAQComponent";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
   
  <Header/>
  <HeroSection/>
  <SearchJob/>
  <InfoSection/>
  <HowItWorks/>
  <FAQComponent/>
  <Footer/>
    </>
  );
}
