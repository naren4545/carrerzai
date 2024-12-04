import React from 'react'
import SkeletonJobCard from './SkeletonJobCard'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

export default function LoadingJob() {
  return (
    <>
   
    <div className='py-10'>
   { Array.from({ length: 5 }).map((_, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<SkeletonJobCard key={index} />
    ))}
    </div>
   
    </>
  )
}
