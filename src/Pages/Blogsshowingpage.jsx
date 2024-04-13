import React, { useEffect, useState } from 'react'
import "../Styles/blogs_showing.css";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { format } from 'date-fns';

function Blogsshowingpage({ headingshow }) {
    useEffect(() => {
        Aos.init();
    }, [])
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function Fetch_posts() {
            await axios.get("https://edudev-server-1.onrender.com/blogs?limit=6").then((result) => {
                setPosts(result.data);
            }).catch(err => console.log(err));
        };
        Fetch_posts();
    }, []);


    return (
        <div className='blogspage' style={{ marginTop: headingshow ? "180px" : "0px" }} data-aos="fade-down">
            <div className='categories_explore'>
                {headingshow ? (<h3 className='category_heading' >#Blogs</h3>) : ""}
                <div className='category_title_box' style={{ alignSelf: headingshow ? "center" : "start" }}>
                    <h1 className='categoty_title' style={{ alignSelf: headingshow ? "center" : "start" }}>Latest News & <span style={{ color: "tomato" }}>Articles</span></h1>
                    <span className='category_sub_quote' style={{ display: headingshow ? "flex" : "none",width:"90%" }}>
                        Stay informed with our curated selection of news and articles covering the cutting-edge developments in technology.
                    </span>
                </div>
            </div>

            {/* mainpagecode */}

            <div className='blogs_showing_section' data-aos="fade-right"  >


                {
                    posts.length > 0 && posts.map((item, index) => {
                        return (
                            <div className='blog_banner_div' key={index}>
                                <div className='backdrop_div'>
                                    <span className='uploaded_date'>
                                        {format(new Date(item.posted_Date), "dd eeee yyyy")}
                                    </span>
                                    <img className="backdrop_pic" src={item.backdrop} alt="blogs_banner" />
                                </div>
                                <div className='About_blog'>
                                    <p className='About_blog_heading'>{item.name}</p>
                                    <p className='About_blog_text' >
                                        <div className='About_blog_text' style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: item.content }} />
                                    </p>
                                    <div className='read_full_post'>
                                        <div className='click_button'>
                                            <span className='click_button_text' onClick={() => navigate("/selectedblog/" + item._id)} style={{ textAlign: "center" }}>Read Post </span><span ><TrendingUpIcon /></span></div>

                                    </div>


                                </div>
                            </div>


                        )


                    })

                }
                {
                    posts.length === 0 ? <CircularProgress /> : ""
                }




            </div>



        </div>






    )
}

export default Blogsshowingpage;