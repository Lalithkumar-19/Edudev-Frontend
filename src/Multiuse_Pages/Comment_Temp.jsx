import React from 'react'
import "./Comment_Temp.css";
import { ThumbUpAltRounded } from '@mui/icons-material';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function Comment_Temp({ blogid,set_data, data, id, img, name, posted_date, commented_text, likes, liked_people }) {
    async function Loadcomments() {
        try {
            const res = await axios.get("https://edudev-server-1.onrender.com/load_comments?blogId="+blogid);
            if (res.status === 200) {
               set_data({...data,comments:res.data});
            }
            else{
                toast.error("comments loading failed..")
            }

        } catch (error) {
            console.log(error);
        }

    }

    async function handlelike() {
        try {

            if (localStorage.getItem("userdata") !== null && localStorage.getItem("token")) {
                const res = await axios.patch(`https://edudev-server-1.onrender.com/add_like_to_comment?id=${id}&token=${localStorage.getItem("token")}`);
                if (res.status === 201) {
                    Loadcomments(); 
                    toast.success("Action done successfully");

                } else {
                    toast.error("Action was not stored");
                    throw new Error('Bad response');
                }
            }
            else {
                toast.error("please login to like")
            }


        } catch (error) {
            console.log(error);
            toast.error("like is not done")
        }
    }
    return (
        <div className='comment_temp'>
            <Toaster position='bottom-right' />
            <section className='commenter_info'>
                <div className='commenter_info_profile'>
                    <img src={img} width={"100%"} style={{ objectFit: "cover", borderRadius: "100%" }} height={"100%"} alt="commenter_profile" />
                </div>
                <div className='commenter_info_details'>
                    <span className='commneter_info_details_name' style={{ fontSize: "15px", fontWeight: "700" }}>
                        {name}
                    </span>
                    <span className='commenter_info_details_posted_date' style={{ fontSize: "12px", opacity: "0.7" }}>
                        {posted_date}
                        {/* May 25,2022 at 11.45 am  */}
                    </span>
                </div>
            </section>
            <section className='commented_text'>
                <p style={{ textAlign: "justify" }}>{commented_text}</p>
            </section>
            <section className='comment_reactions'>
                <span className='like_button' onClick={handlelike} style={{ display: "flex", alignItems: "center", opacity: "0.8", cursor: "pointer" }}><ThumbUpAltRounded color={Array.isArray(liked_people) && liked_people.includes(localStorage.getItem("id")) ? "primary" : ""} /> {likes}<span style={{ textAlign: "center", alignItems: "center", opacity: "0.8", marginLeft: "8px" }}>Like</span></span>
            </section>
        </div>
    )
}

export default Comment_Temp