import React, { useEffect, useState } from 'react'
import "../Styles/Courseplayer.css";
import video from "../assets/video2.mp4";
import pic from "../assets/developerpic.jpg"
import Notice_board from '../Multiuse_Pages/Notice_board';
import Assignments from '../Multiuse_Pages/Assignments';
import Course_videos from '../Multiuse_Pages/Course_videos';
import Navbar from './Navbar';
import Contactpage from '../Pages/FooterPage';
import { Player } from 'react-tuby';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';



function Courseplayer({ }) {
    const courses = useSelector(state => state.My_learnings);
    const { id } = useParams();
    const [Active1, setActive1] = useState(true);
    const [Active2, setActive2] = useState(false);

    const [course, setCourse] = useState(null);
    const [current_video, setCurrent_video] = useState(course && course.course_intro_video);
    const [page, setPage] = useState(0);
    const [small_screen, setSmallscreen] = useState(false);

    function Info_toggler() {
        switch (page) {
            case 1:
                return <Notice_board notice_board={course.noticeboard} />
            case 2:
                return <Assignments assignments={course.assignments} />
            default:
                return <Notice_board notice_board={course.noticeboard} />

        }


    };

    useEffect(() => {
        async function get_course_Details() {
            await axios.get("https://edudev-server-1.onrender.com/get_single_course?id=" + id,).then(data => {
                setCourse(data.data[0]);
                console.log(data.data);
            }).catch(err => {
                console.log(err);
            })
        }
        get_course_Details();
    }, [])

    function ChangeBgColor() {
        switch (page) {
            case 1:
                setActive1(true);
                setActive2(false);
                break;
            case 2:
                setActive1(false);
                setActive2(true);
                break;
            default:
                setActive1(true);
                setActive2(false);
        }

    }



    useEffect(() => {
        ChangeBgColor();
    }, [page]);

    useEffect(() => {
        if (window.innerWidth <= 400) {
            setSmallscreen(true);
        }
        else {
            setSmallscreen(false);
        }
    })


    return (
        <div className='courseplayer'>
            <Navbar />{
                course !== null ? (

                    <div className='course_player_main'>
                        <section className='courseplayer_left'>
                            <div className='course_video_player'>
                                <Player src={current_video ? current_video : video} pictureInPicture />
                            </div>
                            <section className='course_meta_details'>
                                <div className='course_creator_details'>
                                    <div className='course_creator_pic'>
                                        <img src={course.creator.instructor_pic || pic} width={"100%"} style={{ objectFit: "cover", borderRadius: "100%" }} height="100%" alt="course_creator_details" />
                                    </div>
                                    <div className='course_creator_name_role'>
                                        <span className='course_creator_name'>
                                            {course.creator.instructor_name}
                                        </span>
                                        <span className='course_creator_role'>
                                            {course.creator.profession}
                                        </span>
                                    </div>
                                </div>
                                <div className='course_reviews'>
                                    <span className='course_reviews_heading'>
                                        Review
                                    </span>
                                    <span className='course_ratings'>
                                        4.3 ({Array.isArray(course.Reviews) && course.Reviews.length} Reviews) *****
                                    </span>
                                </div>
                            </section>

                            {!small_screen && (
                                <section className='course_main_headlines' id='course_main_headlines'>
                                    <span className='course_headline'>{course.course_name}</span>
                                    <p className='course_main_desc'>{course.course_description}</p>
                                    <div className='selector_buttons' id='vidoe_Player_selection_buttons'>
                                        <button id="buttons_in_course_video" style={{ backgroundColor: Active1 ? "coral" : "transparent" }} onClick={() => { setPage(1) }}>Noticeboad</button>
                                        <button id="buttons_in_course_video" style={{ backgroundColor: Active2 ? "coral" : "transparent" }} onClick={() => { setPage(2) }}>Assignments</button>
                                    </div>


                                    {
                                        Info_toggler()
                                    }


                                </section>

                            )}


                        </section>

                        <section className='courseplayer_right'>
                            <Course_videos curiculm={course.curriculm} curr_video={setCurrent_video} />
                            {
                                small_screen && (
                                    <section className='course_main_headlines' id='course_main_headlines'>
                                        <span className='course_headline'>{course.course_name}</span>
                                        <p className='course_main_desc'>{course.course_description}</p>
                                        <div className='selector_buttons' id='vidoe_Player_selection_buttons'>
                                            <button id="buttons_in_course_video" style={{ backgroundColor: Active1 ? "coral" : "transparent" }} onClick={() => { setPage(1) }}>Noticeboad</button>
                                            <button id="buttons_in_course_video" style={{ backgroundColor: Active2? "coral" : "transparent" }} onClick={() => { setPage(2) }}>Assignments</button>
                                        </div>

                                        {
                                            Info_toggler()
                                        }


                                    </section>

                                )
                            }
                        </section>
                    </div>) : (
                    <div style={{ margin: "0 auto", marginTop: "50px" }}>
                        <CircularProgress />
                    </div>
                )
            }
            <Contactpage />

        </div>
    )
}

export default Courseplayer