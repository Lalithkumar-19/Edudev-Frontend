import React, { useEffect, useState } from 'react'
import "../Styles/coursecard.css";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import VideocamIcon from '@mui/icons-material/Videocam';
import Aos from 'aos';
import "aos/dist/aos.css";
import { DeleteForever, FavoriteOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import pic from "../assets/developerpic.jpg"


function Coursecard({ animation, b, admin, id, course_thumnail, course_name, course_duration, course_price, course_lectures, skill_level, wished_list, buyed, creator, review_length }) {
    const wishlist = useSelector(state => state.wishList);
    const status_of_list = Array.isArray(wishlist) && wishlist.some(item => item._id === id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items_in_list = useSelector(state => state.wishList);

    const handle_add_to_wish = () => {
        if (status_of_list) {
            dispatch({ type: "remove_from_wishlist", payload: id });
            toast.success("Removed from wishlist ");
        }
        else {
            if (localStorage.getItem("token") && localStorage.getItem("userdata")) {
                dispatch({ type: "add_to_wishlist", payload: id });
                toast.success("Added to wishlist ");
            }
            else {
                toast.error("Login to proceed");
            }
        }
    }



    const View_course = () => {
        navigate("/courses/overview/" + id);
    }

    const handle_remove_from_wish = () => {
        dispatch({ type: "remove_from_wishlist", payload: id });
        toast.success("Removed from wishlist ");

    }

    const handle_delete_course = async () => {
        try {
            const res = await axios.put("https://edudev-server-1.onrender.com/delete_course?token=" + localStorage.getItem("instructor-token") + "&id=" + id);
            if (res.status === 200) {
                toast.success("Deleted successfully");
                window.location.reload();
            }
            else {
                toast.error("Error occured while reaching to our servers");
            }

        } catch (error) {
            toast.error("Error occured while deleting...")

        }
    }

    return (
        <div className='course_box' style={{ backgroundColor: b ? "white" : "" }} data-aos={animation ? "fadedown" : ""} >
            <Toaster position='bottom-right' />
            <div className='course_item item_1'>
                <div className='course_backdrop_pic'>
                    <img src={course_thumnail} alt="course_backdrop" className='course_backdrop' />
                </div>
                <div className='course_details'>
                    <div className='course_creator_details'>
                        <img src={creator ? creator.instructor_pic : pic} alt="creator_pic" />
                        <span className='course_creator_main_details'>
                            <h3 className='course_creator_name'>{creator && creator.instructor_name}</h3>
                            <p className='course_rating'>4.7 &nbsp; ⭐({review_length}) &nbsp; </p>
                        </span>
                    </div>
                    <span className='course_name' onClick={View_course}>{course_name} </span>
                    <div className="course_card_bottom">

                        <span className='course_card_bottom_details course_time'>
                            <span style={{ color: "tomato" }}><AccessTimeFilledIcon /></span>  <span style={{ height: "20px" }}>{course_duration && course_duration.length} {course_duration ? (course_duration.field === "W" ? "Weeks" : "Years") : ""} </span>
                        </span>
                        <span className='course_card_bottom_details course_videos'>
                            <span style={{ color: "green" }}><VideocamIcon /></span>  <span style={{ height: "20px", marginLeft: "2px" }}>{course_lectures} Lessons</span>
                        </span>
                        <span className='course_card_bottom_details course_price' style={{ color: "tomato", fontSize: "17px", fontWeight: "900", height: "20px", alignSelf: "center" }}>
                            ₹{course_price}
                        </span>
                    </div>
                </div>
                <div className='top_header'>
                    <span className='learn_tag'>{skill_level}</span>
                    {
                        admin ? (
                            <>
                                <span onClick={handle_delete_course}><DeleteForever fontSize='large' sx={{ color: "black", borderRadius: "10px", background: "white" }} /></span>
                            </>
                        ) : (
                            <>{
                                !wished_list ? (
                                    <span id='fav_course_icon' onClick={handle_add_to_wish} >
                                        <FavoriteOutlined sx={{ background: "white", borderRadius: "100%", color: status_of_list ? "red" : "black", cursor: "pointer" }} />
                                    </span>
                                ) : (
                                    buyed ? "" : (
                                        <span id='fav_course_icon' onClick={handle_remove_from_wish} >
                                            <DeleteIcon sx={{ background: "white", borderRadius: "100%", color: "red", cursor: "pointer" }} />
                                        </span>
                                    )
                                )

                            }


                            </>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default Coursecard;