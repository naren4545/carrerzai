
import Image from "next/image"
import placeHolderImg from "../../assests/Rectangle 82.png"
import arrow from "../../assests/material-symbols-light_arrow-insert.svg"
function BenifitSection() {
  return (
    <section className="py-10 bg-[#0068FF]">
<div className="text-white text-center">

<h2 className="md:text-5xl text-xl md:leading-[72px] font-semibold">Experience the Benefits of Smarter Hiring</h2>
<p className="max-w-[636px] mx-auto md:text-[28px] md:leading-10 text-sm ">Discover the advantages of using our platform to connect 
with the right talent and grow your business.</p>
</div>


<div className="max-w-[1350px] mx-auto p-2">


    <div className="grid grid-cols-1 md:grid-cols-2  bg-[#FFF5D9]">
<div>
<Image src={placeHolderImg} alt="placeholder" className="w-full"/>

</div>

<div className="flex flex-col justify-center p-3">
<div className="flex gap-3">
<div>
   <p className="md:text-4xl text-xl  font-semibold">01</p> 
</div>
<div >
<h2 className="md:text-4xl text-xl font-semibold mb-4">Effortless Job Posting</h2>
<p className="md:text-[28px] md:leading-10 text-sm  font-normal pb-5">Say goodbye to complicated job boards. 
Our platform allows you to post jobs within minutes, with an intuitive interface that guides you through every step. Customize 
job listings with essential details, requirements, and skills, making sure your openings attract the right candidates.</p>

<p className="md:text-[28px] md:leading-10 text-sm font-normal pt-5">Post a Job Now <Image className="inline ml-1 md:w-auto w-[20px]" src={arrow} alt="arrow" /></p>
</div>
</div>

</div>
    </div>






    <div className="grid grid-cols-1 md:grid-cols-2  bg-[#A6CBFF]">


<div className="flex flex-col justify-center p-3">
<div className="flex gap-3">
<div>
   <p className="md:text-4xl text-xl  font-semibold">02</p> 
</div>
<div >
<h2 className="md:text-4xl text-xl font-semibold mb-4">Access to Top Talent Across
Industries</h2>
<p className="md:text-[28px] md:leading-10 text-sm  font-normal pb-5">Tap into a vast network of skilled professionals from various fields, including technology, marketing, design, and more. 
Our platform connects you with candidates who are actively looking for opportunities, ensuring you have access to the best talent, whether you're hiring locally or remotely.</p>

<p className="md:text-[28px] md:leading-10 text-sm font-normal pt-5">Discover Talent <Image className="inline ml-1 md:w-auto w-[20px]" src={arrow} alt="arrow" /></p>
</div>
</div>

</div>

<div>
<Image src={placeHolderImg} alt="placeholder" className="w-full"/>

</div>
    </div>





    <div className="grid grid-cols-1 md:grid-cols-2  bg-[#FFF5D9]">
<div>
<Image src={placeHolderImg} alt="placeholder" className="w-full"/>

</div>

<div className="flex flex-col justify-center p-3">
<div className="flex gap-3">
<div>
   <p className="md:text-4xl text-xl  font-semibold">03</p> 
</div>
<div >
<h2 className="md:text-4xl text-xl font-semibold mb-4">Advanced Candidate Matching 
for Optimal Fit</h2>
<p className="md:text-[28px] md:leading-10 text-sm  font-normal pb-5">Leverage our smart matching algorithms to connect with candidates who perfectly align with your job requirements. Filter results by skills, experience, location, and availability, allowing you to find the ideal candidate who will contribute to your company’s growth 
and success.</p>

<p className="md:text-[28px] md:leading-10 text-sm font-normal pt-5">Search Candidate <Image className="inline ml-1 md:w-auto w-[20px]" src={arrow} alt="arrow" /></p>
</div>
</div>

</div>
    </div>

</div>

    </section>
  )
}

export default BenifitSection