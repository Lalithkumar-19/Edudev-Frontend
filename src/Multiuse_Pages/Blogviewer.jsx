import React, { useEffect, useState } from 'react';
import "./Blogviewer.css";
import Navbar from '../Pages/Navbar';
import { CalendarMonthOutlined, FacebookRounded, Instagram, Person3Outlined, SearchOutlined, Twitter } from '@mui/icons-material';
import Comment_Temp from './Comment_Temp';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import toast, { Toaster } from 'react-hot-toast';

function Blogviewer() {

    const [comment, setComment] = useState("");
    const [data, setData] = useState(null);
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchblog() {
            await axios.get("https://edudev-server-1.onrender.com/fetchOneblog?id=" + id).then((res) => {
                setData(res.data);
            }).catch(err => console.log(err));
        }
        fetchblog();
    }, [id])


    useEffect(() => {
        async function Fetch_posts() {
            await axios.get("https://edudev-server-1.onrender.com/blogs?limit=4").then((result) => {
                setPosts(result.data);
            }).catch(err => console.log(err));
        };
        Fetch_posts();
    }, []);


    async function Loadcomments() {
        try {
            const res = await axios.get("https://edudev-server-1.onrender.com/load_comments?blogId=" + id);
            if (res.status === 200) {
                setData({ ...data, comments: res.data });
            }
            else {
                toast.error("comments loading failed..")
            }

        } catch (error) {
            console.log(error);
        }

    }

    const handle_Comment = async () => {
        try {
            if (comment !== "") {
                const res = await axios.post(`https://edudev-server-1.onrender.com/writeComment?token=${localStorage.getItem("token")}&blogId=${data._id}`, { commented_content: comment });
                if (res.status == 201) {
                    toast.success("comment added successfully");
                    setComment("");
                    Loadcomments();

                }
                else {
                    toast.error("comment is not added , try again !");
                }
            } else {
                toast.error("fill the comment before posting")
            }
        } catch (error) {
            console.log(error);
            toast.error("internal sever error occured")
        }
    }
    
    return (
        <div className='blogviewer'>
            <Navbar />
            <Toaster position='bottom-right' />
            <section className='blogviewer_main_headings'>
                <span className='main_heading' style={{ color: "black", fontSize: "22px", fontWeight: "700", marginBottom: "10px" }}>Blogs Details</span>
                <span className='sub_heading'>Home/<span style={{ color: "coral" }}>Blog</span></span>
            </section>
            {data && <div className='blogviewer_main'>

                <div className="blogviewer_left" >
                    <section className='blogviewer_backdrop'>
                        <img width={"100%"} height={"100%"} style={{ objectFit: "fill", borderRadius: "20px" }} src={data.backdrop} alt='blog_Pic' />
                    </section>
                    <section className='blogviewer_left_headings'>
                        <span className='blog_heading' style={{ fontSize: "20px", fontWeight: "700" }}>{data.name}</span>
                        <div className='blog_posting_details'>
                            <span style={{ textAlign: "center", display: "flex", alignItems: "center" }}><Person3Outlined /> By {data.author.name} </span>
                            <span style={{ textAlign: "center", display: "flex", alignItems: "center", fontSize: "12px" }}><CalendarMonthOutlined />
                                {format(new Date(data.posted_Date), "dd eeee yyyy")}
                            </span>

                        </div>
                    </section>

                    <section className='blogviewer_blog_details'>
                        <p style={{ textAlign: "justify", opacity: ".8", padding: "6px" }}>Lo
                            <div dangerouslySetInnerHTML={{ __html: data.content.slice(0, data.content.length - 300) }} />
                        </p>

                        {/* <p style={{ textAlign: "justify", opacity: ".8", padding: "5px" }}>
                        </p> */}
                    </section>
                    <section className='blogviewer_main_blog_details'>
                        <div dangerouslySetInnerHTML={{ __html: data.content.slice(data.content.length - 300, data.content.length) }} />
                    </section>

                    <footer className='blogviewer_left_end_options'>
                        <div className='blogviewer_left_end_sharing'>
                            <span style={{ color: "black", fontSize: "17px", fontWeight: "400", marginRight: "30px" }}>Social Share</span>
                            <span className='facebook_share'><FacebookRounded /></span>
                            <span className='twitter_share'><Twitter /></span>
                            <span className='linkedin_share'><Instagram /></span>

                        </div>
                        <div className='blogviewer_left_end_tagscloud'>
                            {
                                data.categories.length > 0 ? (
                                    data.categories.map((item, i) => {
                                        return <button id="button" style={{ backgroundColor: "coral", color: "white", border: "none", width: "auto", height: "40px" }} key={i} >{item}</button>

                                    })
                                ) : " loading..."
                            }


                        </div>
                    </footer>
                    <span style={{ color: "black", fontSize: "17px", fontWeight: "700", marginRight: "30px", marginTop: "20px" }}>Recent Comments</span>
                    <div className='Add_comment_box'>
                        <input className='comment_input' type='text' value={comment} onChange={(e) => setComment(e.target.value)} placeholder='write your comment' />
                        <button className='comment_submit_button' type='button' onClick={handle_Comment} >Post</button>
                    </div>
                    {Array.isArray(data.comments) && data.comments.map((item) => {
                        return <Comment_Temp name={item.commenter_details.name} blogid={data._id} set_data={setData} data={data} liked_people={item.liked_users} id={item._id} likes={item.likes} commented_text={item.commented_content} posted_date={format(new Date(item.createdAt), "dd eeee yyyy")} key={item._id} img={item.commenter_details.dp} />
                    })}
                    {Array.isArray(data.comments)&&data.comments.length===0&&"No comments till now"}

                </div>


                <div className="blogviewer_right">

                    <section className="categories">
                        <span style={{ color: "black", fontWeight: "700", fontSize: "18px" }}>Categories</span>
                        <div className='categories_list'>
                            {
                                data.categories.length > 0 ? (
                                    data.categories.map((item, i) => {
                                        return <li className='categoty_item' key={i}>{item}</li>

                                    })
                                ) : " loading..."
                            }

                        </div>
                    </section>
                    <section className='popular_posts'>
                        <h2 >Popular Posts</h2>
                        <div className='all_popular_posts'>

                            {
                                posts.length !== 0 ? (
                                    posts.map((item, i) => {
                                        if (item._id != data._id) {
                                            return (
                                                <div className='post' key={i} onClick={() => navigate("/selectedblog/" + item._id)}>
                                                    <div className='post_pic'>
                                                        <img src={item.backdrop} width={"100%"} height={"100%"} style={{ objectFit: "cover", borderRadius: "8px" }} alt="post_profile" />
                                                    </div>
                                                    <div className='post_details'>
                                                        <p className='About_post'>{item.name} </p>
                                                        <small>Posted on {format(new Date(item.posted_Date), "MM-dd-yyyy")} </small>
                                                    </div>

                                                </div>
                                            )
                                        }

                                    })
                                ) : <CircularProgress />
                            }

                        </div>
                    </section>
                    <section className='tags_cloud'>
                        <span style={{ color: "black", fontWeight: "700", fontSize: "18px" }}>Tags Cloud</span>
                        <div className='all_buttons'>
                            {
                                data.Tags.length > 0 ? (
                                    data.Tags.map((item, i) => {
                                        return <button id='button' key={i}>{item}</button>
                                    })
                                ) : " loading..."
                            }

                        </div>
                    </section>
                    <section className='news_letter_mail'>
                        <p className='news_letter_headline'>Get the latest post & article in your email</p>
                        <input className='email_input' type='email' placeholder='Enter your Email address' />
                        <button id="button" className='subscribe_button'>Subscribe</button>
                    </section>
                </div>

            </div>
            }
            <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
                {data === null ? <CircularProgress /> : ""}
            </div>
        </div>
    )
}

export default Blogviewer;