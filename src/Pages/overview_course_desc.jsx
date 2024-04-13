import React from 'react'
import "../Styles/overview_course_desc.css";
import { CheckCircle } from '@mui/icons-material';
function Overview_course_desc({ Course_desc, course_gains, course_requirements }) {
  return (
    <div className='course_desc' >
      <h3>Course Description</h3>
      <p className='course_Para'>
        {Course_desc}
      </p>
      <h3>What you'll learn</h3>
      <div className='learning_list'>

        {
          course_gains && Array.isArray(course_gains) && course_gains.map((item, i) => {
            return (
              <>
                <span className='learning_list_item' key={i}>
                  <CheckCircle />
                  <span className='list_item_name' >{item}</span>
                </span>

              </>
            )
          })
        }
            </div>
      <div className='requirements'>
        <h3 className='requirements_heading'>Requirements</h3>
        {
          course_requirements && Array.isArray(course_requirements) && course_requirements.map((item, i) => {
            return <li key={i}>{item}</li>

          })
        }

     

      </div>

    </div>
  )
}

export default Overview_course_desc;