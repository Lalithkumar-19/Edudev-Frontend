import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Coursecard from '../Pages/Coursecard';
import "../Styles/featured_courses.css";
import Navbar from '../Pages/Navbar';
import { useSelector } from 'react-redux';

function WishlistPage() {
    console.log(location, "location");
    const courses = useSelector(state => state.wishList);

    return (
        <div className='featured_courses' >
            <Navbar />
            <h3 className='category_heading'>Your Wished Courses</h3>
            <div className='category_title_box'>
                <span className='category_sub_quote'>
                    wishlist
                </span>
            </div>
            <div className='courses_box'>




                {
                    Array.isArray(courses) && courses.map((item, index) => {
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
                                        wished_list={true}
                                        creator={item.creator}
                                        key={index}


                                    />
                                }

                            </>
                        )
                    })


                }
                {
                    Array.isArray(courses) && courses.length === 0 && <h1>No items there is wishlist</h1>
                }



            </div>

            {/* <Contactpage />  */}
        </div>
    )
}

export default WishlistPage;
