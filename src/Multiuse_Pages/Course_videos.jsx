import React, { useState } from 'react';
import "./Course_videos.css";
import { DeleteForever, VideoFileOutlined } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';


function Course_videos({ admin, curiculm, curr_video }) {
    const [active, setActive] = useState({
        k: 0,
        i: 0,
    })
    const handle_click = (video_link, k_val, i_val) => {
        curr_video(video_link);
        setActive({
            k: k_val,
            i: i_val,
        })

    }
    return (

        <div className='course_videos'>

            <div className='all_course_videos'>



                {
                    curiculm && Array.isArray(curiculm) && curiculm.map((item, k) => {
                        return (
                            <>
                                <div className='one_course_video' key={k}>
                                    <h1 className='course_title'>{item.title}</h1>
                                    <div className='course_video_title_bar'>
                                        {
                                            item.curriculum_content && Array.isArray(item.curriculum_content) && item.curriculum_content.map((item, i) => {
                                                return (

                                                    <div className='course_video_title_div' key={i} style={i === active.i && k === active.k ? { backgroundColor: "coral", color: "black" } : {}} onClick={() => handle_click(item.video_link, k, i)} >
                                                        <p className='about_video'>{item.video_title}</p>
                                                        <div style={{paddingLeft:"3px"}}>
                                                            <span className='video_icon'><VideoFileOutlined /></span>
                                                            {
                                                                !admin ? "": <span><DeleteForever sx={{ color: "coral", cursor: "pointer" }} /></span>
                                                            }
                                                        </div>
                                                    </div>

                                                )
                                            })

                                        }

                                    </div>

                                </div>



                            </>
                        )
                    })
                }
                {!curiculm&&(
                <div style={{margin:"0 auto"}}>    <CircularProgress/></div>
                )}




            </div>

        </div>
    )
}

export default Course_videos