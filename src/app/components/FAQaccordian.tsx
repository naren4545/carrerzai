"use client";

import React, { useState } from 'react';

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I improve my chances of getting noticed by employers on Careerzai?",
      answer:
        "To stand out, make sure your profile is complete with a detailed resume, professional summary, and relevant skills. Tailor your resume for each application and take advantage of any skill assessments or certifications that can enhance your profile.",
    },
    {
      question: "How does Careerzai personalize job recommendations for me?",
      answer:
        "Careerzai uses algorithms to match you with jobs that fit your skills, experience, and preferences.",
    },
    {
      question: "Can I get insights into the companies I’m applying to?",
      answer:
        "Yes, Careerzai provides information on companies to help you make informed decisions.",
    },
    {
      question: "How can I get notified when new jobs match my interests?",
      answer:
        "You can set up job alerts to receive notifications for new job postings that match your profile.",
    },
  ];

  return (
    <div className="mx-auto rounded-lg grid grid-cols-1 gap-5">
      {faqs.map((faq, index) => (
        <div key={index} className="mb-2 last:border-b-0">
          <button
            onClick={() => toggleAccordion(index)}
            className={`w-full flex justify-between max-w-[894px] p-4 ${
              openIndex === index ? "bg-[#FFF5D9]" : ""
            } border border-[#c6e7f4] rounded-[23px] shadow-lg`}
          >
            <div className="flex">
              <span className="font-medium md:text-3xl text-base pr-4">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="lg:ml-4 md:text-2xl text-sm max-w-[668px] font-medium text-left">
                  {faq.question}
                </p>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-left text-sm">{faq.answer}</p>
                </div>
              </div>
            </div>
            <span className="text-xl">
              {openIndex === index ? (
                <svg
                  width="16"
                  height="8"
                  viewBox="0 0 16 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.242 7.78973L7.48837 1.6421C7.62465 1.50727 7.80863 1.43164 8.00034 1.43164C8.19206 1.43164 8.37603 1.50727 8.51232 1.6421L14.7587 7.7884C14.8958 7.92316 15.0804 7.99867 15.2727 7.99867C15.4649 7.99867 15.6495 7.92316 15.7866 7.7884C15.8542 7.72256 15.9078 7.64388 15.9445 7.55698C15.9811 7.47009 16 7.37673 16 7.28243C16 7.18812 15.9811 7.09477 15.9445 7.00787C15.9078 6.92097 15.8542 6.84229 15.7866 6.77646L9.5416 0.630156C9.13026 0.226279 8.57682 0 8.00034 0C7.42387 0 6.87042 0.226279 6.45908 0.630156L0.214045 6.77646C0.146312 6.84231 0.0924715 6.92107 0.0557069 7.0081C0.0189423 7.09512 0 7.18863 0 7.28309C0 7.37756 0.0189423 7.47107 0.0557069 7.55809C0.0924715 7.64511 0.146312 7.72388 0.214045 7.78973C0.351179 7.92449 0.535754 8 0.72802 8C0.920286 8 1.10486 7.92449 1.242 7.78973Z"
                    fill="black"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="8"
                  viewBox="0 0 16 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.242 0.21027L7.48837 6.3579C7.62465 6.49273 7.80863 6.56836 8.00034 6.56836C8.19206 6.56836 8.37603 6.49273 8.51232 6.3579L14.7587 0.211604C14.8958 0.0768442 15.0804 0.00133371 15.2727 0.00133371C15.4649 0.00133371 15.6495 0.0768442 15.7866 0.211604C15.8542 0.277436 15.9078 0.356119 15.9445 0.443017C15.9811 0.529913 16 0.623267 16 0.717574C16 0.811882 15.9811 0.905234 15.9445 0.992131C15.9078 1.07903 15.8542 1.15771 15.7866 1.22354L9.5416 7.36984C9.13026 7.77372 8.57682 8 8.00034 8C7.42387 8 6.87042 7.77372 6.45908 7.36984L0.214045 1.22354C0.146312 1.15769 0.0924715 1.07893 0.0557069 0.991905C0.0189423 0.904884 0 0.811375 0 0.716907C0 0.622439 0.0189423 0.528931 0.0557069 0.44191C0.0924715 0.354889 0.146312 0.276123 0.214045 0.21027C0.351179 0.0755105 0.535754 0 0.72802 0C0.920286 0 1.10486 0.0755105 1.242 0.21027Z"
                    fill="black"
                  />
                </svg>
              )}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
