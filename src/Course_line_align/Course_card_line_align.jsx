import React from 'react'
import "./Course_card_line_align.css";
import VideocamIcon from '@mui/icons-material/Videocam';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';

function Course_card_line_align({ item }) {
    const navigate = useNavigate();
    const View_course = () => {
        navigate("/courses/overview/" + item._id);
    }
    return (
        <div className='course_card_align_two' >
            <div className='course_backdrop'>
                <img src={item.course_thumbnail} alt="backdrop_of_course" width={"100%"} height={"100%"} style={{ borderRadius: "10px" }} />
                <span className='level_of_learning'>{item.skill_level}</span>
            </div>
            <div className='course_card_align_two_details'>
                <div className='course_creator_main_details'>
                    <div className="course_creator_pic_div">
                        <img src={"https://edudev-server-1.onrender.com/" + item.creator.instructor_pic} alt="creator_pic" width={"100%"} height={"100%"} style={{ borderRadius: "100%" }} />
                    </div>

                    <span className='creator_name'>{item.creator.instructor_name}</span>
                </div>
                <h1 className='course_name'>{item.course_name}</h1>
                <div className='course_meta_details'>
                    <span className='item item1'>
                        <span className='item_icon' style={{ alignContent: "center", color: "coral" }}><AccessTimeIcon /></span>
                        <span className='item_name'>{item.course_duration.length}Weeks</span>
                    </span>
                    {/* 2ndone */}
                    <span className='item2 item'>
                        <span className='item_icon' style={{ color: "green" }}><VideocamIcon /></span>
                        <span className="item_name"> {item.course_lectures}</span>
                    </span>
                    {/* 3rd one */}
                    <span className='item3 item' style={{ marginRight: "3px" }}>
                        <span className="item_name "> 4.4 🌟(50)</span>
                    </span>
                </div>
                <div className='course_price_and_buy_button_div'>
                    <span className='course_price'>₹{item.course_price}</span>
                    <button className='buy_now' id='button' style={{ marginRight: "3px" }} onClick={View_course}>View course</button>
                </div>
            </div>
        </div>
    )
}

export default Course_card_line_align