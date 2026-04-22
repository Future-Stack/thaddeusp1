import React from 'react'
import Navbar from './_components/Navbar'
import Hero from './_components/Hero'
import HowItWorksNew from './_components/HowItWorksNew'
import ImpactSection from './_components/ImpactSection'
import ImpactCTA from './_components/ImpactCTA'
import ChangeLife from './_components/ChangeLife'
import RealStories from './_components/RealStories'
import RecentWinners from './_components/RecentWinners'
import Footer from './_components/Footer' 
import WinPizza from './_components/WinPizza'

function HomePage() {
  return (
    <div className="">
      <Navbar />
      <main>
        <Hero />
        <WinPizza />

        <ImpactSection />
        <ChangeLife />
        <HowItWorksNew />
        <RealStories />
        <RecentWinners />
        <ImpactCTA />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage




