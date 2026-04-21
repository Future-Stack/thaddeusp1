import React from 'react'
import Navbar from './_components/Navbar'
import Hero from './_components/Hero'
import HowItWorks from './_components/HowItWorks'
import ImpactSection from './_components/ImpactSection'
import ImpactCTA from './_components/ImpactCTA'
import RealStories from './_components/RealStories'
import RecentWinners from './_components/RecentWinners'
import Footer from './_components/Footer'

function HomePage() {
  return (
    <div className="">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <ImpactSection />
        <ImpactCTA />
        <RealStories />
        <RecentWinners />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage




