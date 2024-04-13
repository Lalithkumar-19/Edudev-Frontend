import React from 'react'
import "../Multiuse_Pages/InstructorTemplate.css";
import { BookRounded, Person2Rounded, ReviewsRounded, StarBorderRounded } from '@mui/icons-material';

function InstructorTemplate({ creatorobj, description, learning_objs }) {
  return (
    <div className='instructorpage'>
      <div className='instructor_main_details'>
        <div className='instructor_main_details_left'>
          <img width="100%" height="100%" style={{ objectFit: "cover", borderRadius: "10px" }} src={creatorobj.instructor_pic} alt='instructor_profile' />
        </div>
        <div className='instructor_main_details_right'>
          <span style={{ fontSize: "20px", fontWeight: "800", opacity: "0.8" }}>{creatorobj.instructor_name}</span>
          <span style={{ fontSize: "14px", color: "black", opacity: "0.8 " }}>{creatorobj.profession}</span>
          <p className='about_instructor'>{creatorobj.about_instructor}</p>
          <div className='main_info'>
            <span className='main_info_item'>
              <span className='info_icon' style={{ color: "coral", marginRight: "10px" }}> <StarBorderRounded /></span>
              <p style={{ color: "black", opacity: "0.8", marginLeft: "2px" }}>4.5 Instructor Rating</p>
            </span>
            <span className='main_info_item'>
              <span className='info_icon' style={{ color: "coral", marginRight: "10px" }}> <ReviewsRounded /></span>
              <p style={{ color: "black", opacity: "0.8", marginLeft: "2px" }}>254 Reviews</p>
            </span>


            <span className='main_info_item'>
              <span className='info_icon' style={{ color: "coral", marginRight: "10px" }}> <Person2Rounded /></span>
              <p style={{ color: "black", opacity: "0.8", marginLeft: "2px" }}>{creatorobj.total_students} Students</p>
            </span>


            <span className='main_info_item'>
              <span className='info_icon' style={{ color: "coral", marginRight: "10px" }}> <BookRounded /></span>
              <p style={{ color: "black", opacity: "0.8", marginLeft: "2px" }}>{creatorobj.total_Courses} Courses</p>
            </span>
          </div>

        </div>
      </div>
      <div className='more_info_about_course'>
        <h1 className='first_head' style={{ opacity: "0.8", fontSize: "18px", marginLeft: "0px" }}>
          {learning_objs[0]}
        </h1>
        <p className='about_info' style={{ textAlign: "justify", marginBottom: "19px" }}>
          {description}
        </p>


      </div>


    </div>
  )
}

export default InstructorTemplate;