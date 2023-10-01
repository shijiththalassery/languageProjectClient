import React from 'react'
import Analytics from './landingComponent/Analytics'
import Cards from './landingComponent/Cards';
import Footer from './landingComponent/Footer';
import Hero from './landingComponent/Hero';
import Navbar from './landingComponent/Navbar';
import Newsletter from './landingComponent/Newsletter';

function LandigPage() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Analytics/>
      <Newsletter/>
      <Cards/>
      <Footer/>
    </div>
  )
}

export default LandigPage
