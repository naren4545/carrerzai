
import search from '../../../assests/ic_sharp-search (1).svg'
import location from '../../../assests/ei_location.svg'
import Image from 'next/image';
import SearchBar from '../../component/SerachBar';

const HeroSection: React.FC = () => {
  return (
    <div className='bg-[#0068FF] py-10'>
    <div className='py-10  '>
  <SearchBar jobs={true}/>
    </div>
    </div>
  );
};

export default HeroSection;
