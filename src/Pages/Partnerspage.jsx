import React from 'react'
import "../Styles/partnerpage.css"
function Partnerspage() {
  return (
    <div className='partnerpage'>
    <span className='heading'>Our partners </span>
      <div className='partnerspage_titlebox'>
        <h2>Who you will learn <span style={{color:"tomato"}}>with ?</span></h2>
        <p>Fuel your curiosity; learn with mentors who ignite inspiration and Transform your future; learn with visionaries and Explore, discover, and learn with our expert guidance</p>
      </div>
      <div className='our_partners'>
        <span className='partner'><img src="https://miro.medium.com/v2/resize:fit:925/1*NxKHvCBzgt1xyKZqyr91Gg.jpeg" alt="partners"/></span>
        <span className='partner'><img src="https://www.techxlab.org/img/category-icons/education.png" alt="partners"/></span>
        <span className='partner'><img src="https://educationtothecore.com/wp-content/uploads/2022/11/3-1-1024x1024.png" alt="partners"/></span>
        <span className='partner'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3cQXv3yrgie3JZMfE_o3JiqzGO5_hEYFWobiKN2tEXU3bMXx2pCSSUhY6mcPPASVqtk&usqp=CAU" alt="partners"/></span>

      </div>
        </div>
  )
}

export default Partnerspage