import React from 'react'
import "../Styles/partnerpage.css"

function Partnerspage() {
  return (
    <div className='partnerpage'>
      <h3 className='heading'>#Our Partners</h3>

      <div className='partnerspage_titlebox'>
        <h2 className='partner_title'>Who you will learn <span className='highlight'>with?</span></h2>
        <p className='partner_desc'>
          Fuel your curiosity with mentors who ignite inspiration. Transform your future with visionaries.
          Explore, discover, and learn with our expert guidance.
        </p>
      </div>

      <div className='our_partners'>
        <span className='partner'><img src="https://img.freepik.com/free-vector/flat-design-culture-logo-template_23-2149845368.jpg?semt=ais_hybrid&w=740&q=80" alt="Partner 1" /></span>
        <span className='partner'><img src="https://static.vecteezy.com/system/resources/thumbnails/011/883/296/small/modern-graphic-leaf-abstrack-with-water-drop-colorful-logo-good-for-technology-logo-fruits-logo-fresh-logo-nature-logo-company-logo-dummy-logo-bussiness-logo-vector.jpg" alt="Partner 2" /></span>
        <span className='partner'><img src="https://www.logolounge.com/wp-content/uploads/2023/12/Crash_New1.png" alt="Partner 3" /></span>
        <span className='partner'><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/95965191-fd9b-43bd-b32a-1a00e55b0e02/d2pgs6a-8006bf26-2f11-4158-b9a1-d024688b8433.jpg" alt="Partner 4" /></span>
      </div>
    </div>
  )
}

export default Partnerspage
