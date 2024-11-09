
import React from 'react'
import { headers } from 'next/headers';
import Header from '../../../app/components/Header'
import Wrapper from './components/Wrapper'
import Footer from '../../../app/components/Footer'
import { GetServerSideProps } from 'next';

type PageProps = {
  params: any;
  
};

export default async function Page({  }: PageProps) {

    

  return (
    <div>
       <p>{}</p> 
        <Header/>
        <Wrapper/>
        <Footer/>
    </div>
  )
}
