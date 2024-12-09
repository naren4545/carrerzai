import React from 'react'

import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import SkeletonJobCard from '../../jobs/components/SkeletonJobCard'

export default function LoadingJob() {
  return (
    <>
   
    <div className='py-10 max-w-[1400px] mx-auto'>
   { Array.from({ length: 5 }).map((_, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<SkeletonJobCard key={index} />
    ))}
    </div>
   
    </>
  )
}
