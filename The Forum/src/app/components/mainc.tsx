import React from 'react'
import NavbarBoi from './NavbarBoi'
import HeroSectionHeader from './HeroSectionHeader'
import LatestQuestions from './LatestQuestions'
import Footer from './Footer'

const mainc = () => {
  return (
    <>
       <div className=''>
          {/* <Header /> */}
          <NavbarBoi />
          <HeroSectionHeader />        
          <LatestQuestions />
          <div className='m-10' /> 
          <Footer />
        </div>
    </>
  )
}

export default mainc