"use client";

import React, { useState } from "react";
import FAQAccordion from "./FAQaccordian";
import AssistanceComponent from "./AssistanceComponent";

type FAQItem = {
  question: string;
  answer: string;
};



const FAQComponent: React.FC = () => {
  
  const [selectedOption, setSelectedOption] = useState("Job Seekers");


  function handelFAQ(value:string){
setSelectedOption(value)

  }
  return (
    <section className="py-8">
    <div className="p-4 py-7 md:p-8 max-w-[1400px] mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">FAQs: Your Careerzai Guide</h2>
      <p className="text-center mb-8 text-gray-500">
        Find answers to common questions and gain insights to make the most out of Careerzai.
      </p>
      
      <div className="flex flex-col justify-between md:flex-row gap-6">
        {/* Sidebar */}
        <div className="flex-shrink-0 w-full md:w-1/4">
        <AssistanceComponent selectedOption={selectedOption} setSelectedOption={handelFAQ}/>
        </div>

        {/* FAQ Section */}
        <div className="w-full md:w-3/4">
         <FAQAccordion/>
        </div>
      </div>
    </div>
    </section>
  );
};

export default FAQComponent;
