
import logo from '../assests/CareerZai_LogoFooter.svg'
import Image from 'next/image';
import linkden from '../assests/linkden.svg'
import facebook from '../assests/facebook.svg'
import twitter from '../assests/twitter.svg'
import instagram from '../assests/instagram.svg'
import Link from 'next/link';

const FooterContent = () => {
  return (
    <div className="bg-black text-white py-10 border-b border-[#FFFFFF40]">
      <div className=" mx-auto px-4">
        <div className="grid md:grid-cols-6 grid-cols-3 gap-4">
          {/* Logo and Description */}
          <div className='lg:col-span-2 col-span-3'>
            <div className="flex items-center mb-4">
              <Image src={logo} alt="" className='lg:w-fit w-[165px] '/>
            </div>
            <p className="md:text-2xl text-sm font-normal font-py mb-4">
              Whether you're seeking the perfect job or the ideal candidate, <span className="text-[#FFBA00] font-semibold">Careerzai</span> connects job seekers with top employers and helps businesses find the right talent.
            </p>
            <div className="flex space-x-4">
              <a href="/" aria-label="LinkedIn">
                <Image className='lg:w-fit w-[35px]' src={linkden} alt="LinkedIn" />
              </a>
              <a href="/" aria-label="Facebook">
                <Image className='lg:w-fit w-[35px]' src={facebook} alt="Facebook"  />
              </a>
              <a href="/" aria-label="Twitter">
                <Image className='lg:w-fit w-[35px]' src={twitter} alt="Twitter"  />
              </a>
              <a href="/" aria-label="Instagram">
                <Image className='lg:w-fit w-[35px]' src={instagram} alt="Instagram"  />
              </a>
            </div>
          </div>
<div className='lg:block hidden'/>
          {/* Links Section */}
          <div>
            <h3 className="md:text-2xl text-base font-bold mb-4">About</h3>
            <ul className="space-y-2 md:text-xl text-sm">
              <li><Link href="/find-jobs/jobs" className="text-gray-400 hover:text-white">Jobs</Link></li>
              <li><Link href="/find-jobs/internships" className="text-gray-400 hover:text-white">Internships</Link></li>
              <li><Link href="/find-jobs" className="text-gray-400 hover:text-white">How It Works</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white">FAQ's</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="md:text-2xl text-base font-bold mb-4">Help</h3>
            <ul className="space-y-2 md:text-xl text-sm">
              <li><a href="/" className="text-gray-400 hover:text-white">Support</a></li>
              <li><a href="/" className="text-gray-400 hover:text-white">Careers</a></li>
              <li><a href="/" className="text-gray-400 hover:text-white">Security</a></li>
            </ul>
          </div>

          <div>
            <h3 className="md:text-2xl text-base font-bold mb-4">Company</h3>
            <ul className="space-y-2 md:text-xl text-sm">
              <li><a href="/" className="text-gray-400 hover:text-white">About CareerZai</a></li>
              <li><a href="/" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="/" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContent;
