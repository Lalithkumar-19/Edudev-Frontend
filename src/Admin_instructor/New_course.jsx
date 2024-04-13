import React from 'react'
import "./new_course.css"
import Stepper from './Stepper'
import { CourseProvider } from './ContextApi/Course_context'
function New_course() {

    return (
        <div className='new_course'>
            <h1 className='new_course_title'>New course</h1>
            <CourseProvider>
                <section>
                    <Stepper />
                </section>
            </CourseProvider>


        </div>
    )
}

export default New_course