import React, { useState } from 'react'
import "../Multiuse_Pages/Reviewpage.css";
import { TrendingUp } from '@mui/icons-material';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { toast } from 'react-hot-toast';
function Reviewpage({ id, reviews }) {
    const [review_limit, setLimit] = useState(1);

    const [data, setData] = useState({
        rating: "",
        review_content: ""
    })

    console.log(data);


    const handle_Add_Review = async () => {

        if (data.rating !== "" && data.review_content !== "") {
            if (localStorage.getItem("token") && localStorage.getItem("userdata")) {

                try {
                    await axios.post(`https://edudev-server-1.onrender.com/add_course_review?id=${id}&token=${localStorage.getItem("token")} `, data, {
                        withCredentials: true,
                    }).then((res) => {
                        if (res.status === 200) {
                            toast.success("Successfully Review Added");
                            setData({
                                rating: "",
                                review_content: ""
                            })
                        }
                        else {
                            toast.error("There is something wrong..try later");
                        }
                    }).catch(err => {
                        toast.error("Internal server error occured ");
                        console.log("error is ", err);

                    })

                } catch (error) {
                    console.log("There is a error occured", error)
                }
            }
            else {
                toast.error("please login to proceed");
            }


        }
        else {
            toast.error("PLease fill all fields");
        }
    }


    return (
        <div className='review_page'>
            <h1 className='review_page_title' style={{ marginLeft: "0px" }}>Reviews</h1>
            <div className='ratings'>
                <section className='overall_rating'>
                    <span style={{ fontSize: "30px", textAlign: "center" }} className='rating_number'>4.7</span>
                    <p style={{ marginTop: "2px" }}> ⭐⭐⭐⭐⭐
                        <br />
                        ({Array.isArray(reviews)&&reviews.length} Reviews)
                    </p>

                </section>
                <div className='ratings_indicators'>
                    <section className='rating_bars'>
                        <span className='main_rate_bar'>
                            <span className='inner_rate_bar' style={{ width: "90%" }}></span>
                        </span>

                        <span className='main_rate_bar'>
                            <span className='inner_rate_bar' style={{ width: "70%" }}></span>
                        </span>

                        <span className='main_rate_bar'>
                            <span className='inner_rate_bar' style={{ width: "50%" }}></span>
                        </span>

                        <span className='main_rate_bar'>
                            <span className='inner_rate_bar' style={{ width: "30%" }}></span>
                        </span>

                        <span className='main_rate_bar'>
                            <span className='inner_rate_bar' style={{ width: "10%" }}></span>
                        </span>



                    </section>
                    <section className='rating_stars'>
                        <span className='fivestar'> ⭐⭐⭐⭐⭐</span>
                        <span className='fourstar'> ⭐⭐⭐⭐</span>
                        <span className='threestar'> ⭐⭐⭐</span>
                        <span className='twostar'> ⭐⭐</span>
                        <span className='onestar'> ⭐</span>
                    </section>
                </div>
            </div>
            <div className='recent_reviews'>
                <h1 className='recent_reviews_title'>Recent Review</h1>
                <section className='main_reviews'>


                    {
                        reviews && Array.isArray(reviews) && reviews.map((item, i) => {
                            if (i !== (review_limit-1)) {
                                return (
                                    <div className='student_reviews_left_box' key={i}>
                                        <p>{item.review_content}</p>
                                        <div className='student_details'>
                                            <img src={item.reviwer_details.dp} alt="student" />

                                            <span className='about_student'>
                                                <span className='student_name' style={{ width: "150px", marginLeft: "0px" }}>{item.reviwer_details.name}
                                                    <p style={{ margin: "1px", textAlign: "start", width: "auto" }}>{item.reviwer_details.profession}</p>
                                                </span>

                                                <p className='student_rating' style={{ backgroundColor: "maroon", width: "50px", color: "white", textAlign: "center" }}>{item.rating}⭐</p>
                                            </span>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }

                </section>
                <div className='all_Reviews'>
                    <button className='click_button' onClick={()=>{setLimit(review_limit+5)}}>
                        Load more <span><TrendingUp /></span>
                    </button>


                </div>

                <section className='new_review_form' id='new_review_form'>
                    <h1 className='review_header_title'>Write a Review</h1>

                    <Rating
                        name="simple-controlled"
                        value={data.rating}
                        onChange={(event, newValue) => {
                            setData({ ...data, rating: newValue });
                            setRating(newValue);
                        }}
                    />

                    <form className='review_taken_form' style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                        <textarea className='review_title'
                            placeholder='Review Description'
                            type='text' name='review_title'
                            value={data.review_content}
                            onChange={(e) => setData({ ...data, review_content: e.target.value })}
                            required style={{ resize: "none", height: "50px", width: "400px", textIndent: "5px" }} />
                        <button type='button' id='button' onClick={handle_Add_Review} className='submit_button' >
                            Submit Review
                        </button>


                    </form>
                </section>


            </div>



        </div>
    )
}

export default Reviewpage