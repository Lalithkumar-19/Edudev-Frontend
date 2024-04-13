import React from 'react'
import Navbar from './Navbar';
import Carousal from './Carousalpage';
import Banner_component from './Banner_component';
import Explorepage from './Explorepage';
import Feautured_courses from './Feautured_courses';
import Partnerspage from './Partnerspage';
import Student_reviews from './Student_reviews';
import Blogsshowingpage from './Blogsshowingpage';
import Instructorpage from './Instructorpage';
import Contactpage from './FooterPage';
function Homepage() {
  return (
    <div style={{overflowX:"hidden"}}>
        <Navbar/>
        <Carousal/>
        <Banner_component/>
        <Explorepage/>
        <Feautured_courses courses_restrict={false} heading={"#Top Courses"} desc={"  There are many variations of passages of courses are available on this website ,but majority have suffered alteration in some "}/>
        <Partnerspage/>
        <Student_reviews/>
        <Blogsshowingpage headingshow={true}/>
        <Instructorpage/>
        <Contactpage/>
       
        </div>
  )
}

export default Homepage;