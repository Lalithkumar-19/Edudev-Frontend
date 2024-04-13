import React, { useEffect, useState } from 'react'
import "../Styles/featured_courses.css";
import Coursecard from './Coursecard';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

function Feautured_courses({ heading, desc, titleBoolean, courses_restrict, id }) {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function Load_data() {
            await axios.get("https://edudev-server-1.onrender.com/get_all_courses").then((data) => {
                console.log(data.data);
                setCourses([...data.data]);
            })
        }
        Load_data();
    }, [])
    
    return (
        <div className='featured_courses' >
            <h3 className='category_heading'>{heading}</h3>
            <div className='category_title_box'>
                {
                    titleBoolean ?
                        <h1 className='categoty_title'>Explore Top <span style={{ color: "tomato" }}>Courses </span></h1> : ""}
                <span className='category_sub_quote'>
                    {desc}
                </span>
            </div>

            <div className='courses_box'>




                {

                    courses.map((item, index) => {
                        if (item._id !== id) {
                            return (
                                <>
                                    {
                                        item && <Coursecard course_thumnail={item.course_thumbnail}
                                            course_duration={item.course_duration}
                                            course_name={item.course_name}
                                            course_price={item.course_price}
                                            id={item._id}
                                            skill_level={item.skill_level}
                                            course_lectures={item.course_lectures}
                                            key={index}
                                            creator={item.creator}
                                            review_length={Array.isArray(item.Reviews) && item.Reviews.length}

                                        />
                                    }

                                </>
                            )
                        }
                        else {
                            return (
                                <>
                                    <h1>No courses loaded</h1>
                                </>
                            )
                        }
                    })


                }



            </div>{
                courses.length === 0 && (
                    <div style={{margin:"0 auto",marginTop:"40px"}}>
                        <CircularProgress />
                    </div>

                )
            }

            {/* <Contactpage />  */}
        </div>
    )
}

export default Feautured_courses