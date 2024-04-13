import React, { useEffect, useState } from 'react'
import "../Styles/Online_Course_overview.css";
import Img from "../assets/education.jpg";
import videodemo from "../assets/video2.mp4";
import { BookRounded, ShareSharp, TimerRounded } from '@mui/icons-material';
import Navbar from './Navbar';
import Overview_course_desc from '../Pages/overview_course_desc';
import Feautured_courses from './Feautured_courses';
import CuriculmTemp from './CuriculmTemp';
import InstructorTemplate from '../Multiuse_Pages/InstructorTemplate';
import Reviewpage from '../Multiuse_Pages/Reviewpage';
import Contactpage from './FooterPage';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';


function Online_Course_overview() {
    const params = useParams();
    const courses = useSelector(state => state.My_learnings);
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();

    const [Screen_small, setScreen_small] = useState(false);
    useEffect(() => {
        if (window.innerWidth <= 600) {
            setScreen_small(true);
        }
        else {
            setScreen_small(false);
        }
    }, [])
    const [Active1, setActive1] = useState(true);
    const [Active2, setActive2] = useState(false);
    const [Active3, setActive3] = useState(false);
    const [Active4, setActive4] = useState(false);

    const [page, setPage] = useState(0);



    function ChangeBgColor() {
        switch (page) {
            case 1:
                setActive1(true);
                setActive2(false);
                setActive3(false);
                setActive4(false);
                break;
            case 2:
                setActive1(false);
                setActive2(true);
                setActive3(false);
                setActive4(false);
                break;
            case 3:
                setActive1(false);
                setActive2(false);
                setActive3(true);
                setActive4(false);
                break;
            case 4:
                setActive1(false);
                setActive2(false);
                setActive3(false);
                setActive4(true);
                break;


        }

    }


    useEffect(() => {

        ChangeBgColor();
    }, [page]);


    useEffect(() => {
        async function get_course_Details() {
            console.log("invoked...");
            await axios.get("https://edudev-server-1.onrender.com/get_single_course?id=" + params.id,).then(data => {
                setCourse(data.data[0]);
            }).catch(err => {
                console.log(err);
            })
        }
        get_course_Details();
    }, [])
    function Info_toggler() {
        switch (page) {
            case 1:
                return <Overview_course_desc Course_desc={course.course_description} course_gains={course.learning_objs} course_requirements={course.requirements} />
            case 2:
                return <CuriculmTemp circulum={course.curriculm} />
            case 3:
                return <InstructorTemplate description={course.course_description} learning_objs={course.learning_objs} creatorobj={course.creator} />
            case 4:
                return <Reviewpage id={course._id} reviews={course.Reviews} />
            default:
                return <Overview_course_desc Course_desc={course.course_description} course_gains={course.learning_objs} course_requirements={course.requirements} />

        }

    };

    const stripePromise = loadStripe("pk_test_51NytQZSCR13VXk2t4xS5scD4w4R3pGSOYJnkvFd21myYOBWy8Iurot26oRpg03sam9shpg9jePFNk1CQ50LoZvSS00cDpJcctn");


    const Buy_the_course = async () => {
        try {
            if (localStorage.getItem("token") && localStorage.getItem("userdata")) {
                const res = await axios.post('https://edudev-server-1.onrender.com/Buy_a_course_checkout', { name: "web development", id: course._id, userId: localStorage.getItem("id"), price: course.course_price, course_id: course._id });
                const stripe = await stripePromise;
                await stripe.redirectToCheckout({ sessionId: res.data.id });
            } else {
                toast.error("Login to buy the course");
            }
        } catch (error) {
            console.log(error);
            toast.error("Try to buy it later or check connection");
        }
    }
    return (
        <div className='course_main'>
            <Navbar />
            <Toaster />
            {course && (
                <>
                    <div className='course_overview'>
                        <div className='course_overView_left'>
                            <header className='course_overView_left_header'>
                                <h1 className="course_overView_left_header_heading" style={{ marginLeft: "0px", overflow: "clip" }}><span style={{ color: "#05386b", padding: "1px" }}>{course.course_name}</span></h1>
                                <div className='course_details_overview'>
                                    <img className='image_owner' width="60px" height="60px" src={course.creator.instructor_pic} alt='course_creator' />
                                    <div className='course course_createdby'>
                                        <strong className='item_sub_title'>Created by</strong>
                                        <span style={{ color: "black" }} className='course_creator_name'>  {course.creator?.instructor_name || 'Unknown Instructor'}</span>
                                    </div>
                                    <div className='course course_category'>
                                        <strong className='item_sub_title'>Categories</strong>
                                        <span style={{ color: "black" }}>{course.category}</span>
                                    </div>
                                    <div className='course course_reviews'>
                                        <strong className='item_sub_title'>Reviews</strong>
                                        <div className='course_reviews_ratings' style={{ color: "black" }}>
                                            <span className="course_review_count">({Array.isArray(course.Reviews) && course.Reviews.length} Reviews)</span>
                                        </div>
                                    </div>

                                </div>
                            </header>
                            {
                                !Screen_small ? (
                                    <>
                                        <div id='option_selectors'>
                                            <button id="selection_buttons button1" style={{ backgroundColor: Active1 ? "coral" : "transparent" }} onClick={() => { setPage(1) }}>Overview</button>
                                            <button id="selection_buttons button2" style={{ backgroundColor: Active2 ? "coral" : "transparent" }} onClick={() => { setPage(2) }}>Curriculum</button>
                                            <button id="selection_buttons button3" style={{ backgroundColor: Active3 ? "coral" : "transparent" }} onClick={() => { setPage(3) }}>Intructor</button>
                                            <button id="selection_buttons button4" style={{ backgroundColor: Active4 ? "coral" : "transparent" }} onClick={() => { setPage(4) }}>Review</button>
                                        </div>
                                        {
                                            Info_toggler()
                                        }</>
                                ) : ""
                            }




                        </div>
                        <div className='course_overView_right'>
                            <div className='price_indicator'>
                                <span className='price'>₹{course.course_price}
                                    <span className='total_price'>₹{course.course_actual_price}</span>
                                </span>

                                <span className='offer_cutprice'>70%off</span>
                            </div>

                            <div className='course_video_layout'>

                                <video src={course.course_intro_video ? "https://edudev-server-1.onrender.com/" + course.course_intro_video : videodemo} controls className='video' width={"90%"} height={"200px"} />
                                {
                                    Array.isArray(courses) && courses.some((it) => it._id === course._id) ? (
                                        <button className='buy_now_button buttons' onClick={() => navigate(`/courseplayer/${params.id}`)} style={{ marginTop: "10px" }}>
                                            Open course
                                        </button>
                                    ) : (
                                        <button className='buy_now_button buttons' onClick={Buy_the_course} style={{ marginTop: "10px" }}>
                                            Buy Now
                                        </button>
                                    )
                                }




                            </div>

                            <div className='course_video_meta_data'>
                                <div className='course_meta'>
                                    <span className='course_meta_icon'><TimerRounded />
                                        <span className='course_meta_item_name'>Duration</span>
                                    </span>
                                    <span className='meta_value'>{(course.course_duration&&course.course_duration.length)} {course.course_duration&&course.course_duration.field}</span>

                                </div>
                            </div>
                            {/* second item */}
                            <div className='course_video_meta_data'>
                                <div className='course_meta'>
                                    <span className='course_meta_icon'><BookRounded />
                                        <span className='course_meta_item_name'>Lectures</span>
                                    </span>
                                    <span className='meta_value'>{course.course_lectures}</span>

                                </div>
                            </div>

                            {/* third item */}
                            <div className='course_video_meta_data'>
                                <div className='course_meta'>
                                    <span className='course_meta_icon'><TimerRounded />
                                        <span className='course_meta_item_name'>Enrolled</span>
                                    </span>
                                    <span className='meta_value'>{course.creator.total_students} students</span>

                                </div>
                            </div>

                            {/* fourth item */}
                            <div className='course_video_meta_data'>
                                <div className='course_meta'>
                                    <span className='course_meta_icon'><TimerRounded />
                                        <span className='course_meta_item_name'>Languages</span>
                                    </span>
                                    <span className='meta_value'>{course.course_language}</span>

                                </div>
                            </div>

                            {/* fifth item */}
                            <div className='course_video_meta_data'>
                                <div className='course_meta'>
                                    <span className='course_meta_icon'><TimerRounded />
                                        <span className='course_meta_item_name'>Skill Level</span>
                                    </span>
                                    <span className='meta_value'>{course.skill_level}</span>

                                </div>
                            </div>

                            {/* sixth item */}
                            <div className='course_video_meta_data'>
                                <div className='course_meta'>
                                    <span className='course_meta_icon'><TimerRounded />
                                        <span className='course_meta_item_name'>Deadline</span>
                                    </span>
                                    <span className='meta_value'>
                                        {new Date(course.Deadline).toLocaleDateString()}
                                    </span>

                                </div>
                            </div>

                            {/* seventh item */}
                            <div className='course_video_meta_data'>
                                <div className='course_meta'>
                                    <span className='course_meta_icon'><TimerRounded />
                                        <span className='course_meta_item_name'>Certificate</span>
                                    </span>
                                    <span className='meta_value'>{course.certificate ? "yes" : "No"}</span>

                                </div>
                            </div>

                            <div className='course_video_meta_data  share_button'>
                                <div className='share_button_inner'>
                                    <span className='share_meta_icon'><ShareSharp />
                                        <span className='share_meta_item_name' onClick={() => { navigator.share({ title: course.course_name, text: course.course_description, url: window.location }) }}>Share This Course</span>
                                    </span>


                                </div>
                            </div>

                            <div className='tags_cloud'>
                                <h1>Tags Cloud</h1>
                                <div className='button_div'>
                                    {
                                        course.Tags && Array.isArray(course.Tags) && course.Tags.map((tag, i) => {
                                            return <button className='tags_button' key={i}>{tag}</button>

                                        })
                                    }

                                </div>


                            </div>


                        </div>


                    </div>

                    {
                        !Screen_small ? "" : (
                            <>
                                <div id='option_selectors'>
                                    <button id="selection_buttons button1" style={{ backgroundColor: Active1 ? "coral" : "transparent" }} onClick={() => { setPage(1) }}>Overview</button>
                                    <button id="selection_buttons button2" style={{ backgroundColor: Active2 ? "coral" : "transparent" }} onClick={() => { setPage(2) }}>Curriculum</button>
                                    <button id="selection_buttons button3" style={{ backgroundColor: Active3 ? "coral" : "transparent" }} onClick={() => { setPage(3) }}>Intructor</button>
                                    <button id="selection_buttons button4" style={{ backgroundColor: Active4 ? "coral" : "transparent" }} onClick={() => { setPage(4) }}>Review</button>
                                </div>
                                {
                                    Info_toggler()
                                }</>
                        )
                    }
                    <Feautured_courses heading={"Related Courses"} desc={"Discover top courses from below"} titleBoolean={false} id={course._id} />
                    <Contactpage />
                </>)
            }

            {course === null && (
                <div style={{ margin: "0 auto", marginTop: "30px" }}>
                    <CircularProgress />
                </div>
            )}



        </div>
    )
}

export default Online_Course_overview;