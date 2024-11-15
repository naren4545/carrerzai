import React from 'react'
import message from '../assests/uil_comment-alt-message.svg'
import bell from '../assests/clarity_notification-line.svg'
import Image from 'next/image'

export default function NotificationMessageComp() {
  return (
    <div className="relative md:min-w-[160px] min-w-[85px] justify-between gap-5 flex w-full lg:w-fit px-3">
    <button type="button">
<Image src={message} className='md:w-auto w-5' alt=""/>

</button>
<button type="button">

<Image src={bell } className='md:w-auto w-5' alt=""/>
</button>
      
    </div>
  )
}
