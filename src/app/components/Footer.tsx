
import SubscribeForm from './SubscribeForm'
import FooterContent from './FooterContent'
import Copyright from './Copyright'

export default function Footer() {
  return (
    <footer className='bg-black'>
    <div className='max-w-[1400px] mx-auto'>
      <SubscribeForm/>
      <FooterContent/>
      <Copyright/>
    </div>
    </footer>
  )
}
