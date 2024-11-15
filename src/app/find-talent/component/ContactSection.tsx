

const ContactSection: React.FC = () => {
  return (
    <section className="flex flex-col  items-center justify-center bg-blue-500 text-white py-16 px-4">
      <h2 className="text-5xl font-semibold mb-4">Get in Touch with Us</h2>
      <p className="text-center max-w-[887px] text-2xl mb-8">
      Have questions or need assistance? We're here to help. 
Reach out to us for support, inquiries, or feedback, 
and we'll get back to you promptly.      </p>
      <div className="flex flex-col md:flex-row items-center gap-4 max-w-[920px] mx-auto">
        <input
          type="text"
          placeholder="Enter your Contact number..."
          className="px-4 py-3 text-gray-800 md:min-w-[670px]  md:h-[97px] w-full md:w-80 focus:outline-none"
        />
        <button type='button' className="bg-yellow-500 md:h-[97px] md:min-w-[273px]  md:text-[32px] text-white font-semibold py-3 px-6 hover:bg-yellow-600 transition-colors">
          Contact Now
        </button>
      </div>
    </section>
  );
};

export default ContactSection;
