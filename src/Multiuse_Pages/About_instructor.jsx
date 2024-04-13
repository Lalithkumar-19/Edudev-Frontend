import React, { useEffect, useState } from "react";
import "./About_instructor.css";
import { AssistWalker, CallMadeRounded, FacebookOutlined, GroupOutlined, LinkedIn, LocationCityOutlined, MailOutline, NetworkCellOutlined, PlayCircleRounded, Twitter } from "@mui/icons-material";
import pic from "../assets/developerpic.jpg"
import Coursecard from "../Pages/Coursecard";
import Navbar from "../Pages/Navbar";
import Contactpage from "../Pages/FooterPage";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";

function About_instructor() {
    const [courses, setCourses] = useState([]);
    const params = useParams();
    const [data, setData] = useState(null);
    const Fetch_Instructor_data = async () => {
        try {
            const res = await axios.get("https://edudev-server-1.onrender.com/fetch_one_ins?id=" + params.id);
            if (res.status === 200) {
                setData(res.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        Fetch_Instructor_data();
    }, [])
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
        <div className="about_instructor">
            <Navbar />
            <span className="heading">Instructor Details</span>
            <span className="sub_heading">Home/<span className="sub_sub_heading">Instructor</span>

            </span>
            {
                data && (

                    <div className="about_instructor_main">


                        <section className="about_instructor_left">

                            <div className="about_instructor_card">
                                <div className="instructor_pic">
                                    <img src={"https://edudev-server-1.onrender.com/" + data.instructor_pic} width={"100%"} style={{ borderRadius: "20px" }} height={"100%"} alt="instructor_profile" />
                                </div>
                                <div className="about_instructor_details">
                                    <div className="about_instructor_details_item">
                                        <span className="details_title">
                                            <LocationCityOutlined /><span className="title">Address</span>
                                        </span>
                                        <span className="details_desc">
                                            {data.address}
                                        </span>
                                    </div>
                                    {/* seconsone */}
                                    <div className="about_instructor_details_item">
                                        <span className="details_title">
                                            <MailOutline /> <span className="title">Email</span>
                                        </span>
                                        <span className="details_desc">
                                            {data.email}
                                        </span>
                                    </div>

                                    {/* thirdone */}
                                    <div className="about_instructor_details_item">
                                        <span className="details_title">
                                            <CallMadeRounded /><span className="title">Phone</span>
                                        </span>
                                        <span className="details_desc">
                                            {data.phonenumber}
                                        </span>
                                    </div>
                                    {/* fouthone */}
                                    <div className="about_instructor_details_item">
                                        <span className="details_title">
                                            <NetworkCellOutlined /><span className="title">Website</span>
                                        </span>
                                        <span className="details_desc">
                                            {data.website}
                                        </span>
                                    </div>
                                </div>
                                <div className="follow_me_div">
                                    <div className="follow_me">
                                        <span className="follow_me_title">Follow Me:</span>
                                        <span className="fb_link" ><a href={data.social_media.facebook?data.social_media.facebook:"#"}><FacebookOutlined /></a></span>
                                        <span className="twitter_link"><a href={data.social_media.twitter?data.social_media.twitter:"#"}><Twitter /></a></span>
                                        <span className="linkedin_link"><a href={data.social_media.LinkedIn?data.social_media.LinkedIn:"#"}><LinkedIn /></a></span>
                                    </div>
                                </div>
                            </div>

                        </section>
                        <section className="about_instructor_right">
                            <h1 style={{ marginLeft: "0px", marginBottom: "3px", marginTop: "0px" }} className="instructor_name">
                                {data.instructor_name}
                            </h1>
                            <span className="instructor_role">
                                {data.profession}
                            </span>
                            <p className="instructor_details">
                                {data.about_instructor}
                            </p>
                            <div className="instructor_meta_details">
                                <div className="meta_item">
                                    <span className="player_icon">  <PlayCircleRounded fontSize="large" /></span>
                                    <h1 className="meta_details_number">{data.total_Courses}</h1>
                                    <span className="meta_item_name">
                                        Total Courses
                                    </span>
                                </div>


                                {/* secondone */}
                                <div className="meta_item">
                                    <span className="player_icon">  <GroupOutlined fontSize="large" /></span>
                                    <h1 className="meta_details_number" >{data.total_students}</h1>
                                    <span className="meta_item_name">
                                        Total Students
                                    </span>
                                </div>

                                {/* thirdone */}

                                <div className="meta_item">
                                    <span className="player_icon">  <AssistWalker fontSize="large" /></span>
                                    <h1 className="meta_details_number">{data.years_of_experience}</h1>
                                    <span className="meta_item_name">
                                        Years in Experience
                                    </span>
                                </div>
                            </div>
                            <div className="skills_bars">
                                <h1 style={{ marginLeft: "0px" }}>Skills</h1>

                                {Array.isArray(data.skills) &&
                                    data.skills.map((item, i) => {
                                        return (
                                            <div className="skill_item" key={i}>
                                                <span className="skill_name">
                                                    {item.skillname}
                                                </span>
                                                <span className="skill_bar">
                                                    <span className="skill_bar_main">
                                                        <span className="skill_indicator" ></span>
                                                    </span>
                                                    <span className="skill_perc">{item.percent}%</span>


                                                </span>
                                            </div>
                                        )
                                    })

                                }
                               
                            </div>
                        </section>

                    </div>
                )}
                {!data&&<CircularProgress/>}
            <section className="more_courses_by_author">
                <h1 className="more_courses_title_head" style={{ textAlign: "center" }}>More Courses to learn</h1>
                <div className="courses">
                    {

                        courses && courses.map((item, index) => {
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

                                        />
                                    }

                                </>
                            )
                        })


                    }



                </div>
            </section>

            <Contactpage />


        </div >




    )
}


export default About_instructor;