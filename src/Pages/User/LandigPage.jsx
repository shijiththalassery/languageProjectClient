import React from 'react'
import Analytics from './landingComponent/Analytics'
import Cards from './landingComponent/Cards';
import Hero from "./landingComponent/Hero"
import Footer from './landingComponent/Footer';
import Navbar from './landingComponent/Navbar';
import Newsletter from './landingComponent/Newsletter';
import { useNavigate } from 'react-router-dom';

function LandigPage() {
  const navigate = useNavigate();
  const tutor = localStorage.getItem('tutorEmail');
  const student = localStorage.getItem('studentEmail');
  if (tutor) {
    navigate('/tutorHome');
  } else if (student) {
    navigate('/studentHome');
  }
  return (
    <div>
      <Navbar />
      <Hero />
      <Analytics />
      <Newsletter />
      <Cards />
      <Footer />
    </div>
  )
}

export default LandigPage
