import React from 'react'
import "../Styles/Student_review.css";

function Student_reviews() {
    return (
        <div className='student_reviews'>

            <div className='categories_explore'>
                <h3 className='category_heading'>#Review</h3>
                <div className='category_title_box'>
                    <h1 className='categoty_title'>Our Student <span style={{ color: "tomato" }}>Review </span></h1>
                    <span className='category_sub_quote' style={{ width: "500px", textAlign: "center", lineHeight: "27px" }}>
                        Discover why students love learning with us! Read firsthand experiences from our diverse community of learners about their educational journey at Educational Institution. From engaging courses to supportive instructors, find out what makes studying here a truly transformative experience.
                    </span>
                </div>
            </div>
            <div className="student_reviews_main">
                <div className='student_reviews_left'>

                    <div className='student_reviews_left_box'>
                        <p style={{ lineHeight: "27px" }}>
                            <q> My experience has been nothing short of exceptional. The courses are engaging, the instructors are knowledgeable and supportive, and the resources provided are invaluable. I've found the learning environment to be conducive to my growth, both academically and personally.
                            </q> </p>
                        <div className='student_details'>
                            <img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="student" />

                            <span className='about_student'>
                                <span className='student_name' style={{ width: "150px", marginLeft: "0px" }}>Rani
                                    <p style={{ margin: "1px", textAlign: "center", width: "15px" }}>Student</p>
                                </span>

                                <p className='student_rating' style={{ backgroundColor: "maroon", width: "50px", color: "white", textAlign: "center" }}>4⭐</p>
                            </span>
                        </div>
                    </div>




                    {/* secondone */}
                    <div className='student_reviews_left_box'>
                        <p style={{ lineHeight: "27px" }}>
                            <q> The flexibility in scheduling and the variety of course offerings have allowed me to tailor my educational journey to fit my needs and interests. The practical insights gained from hands-on projects and real-world applications have significantly enhanced my skill set and prepared me for future challenges.
                            </q> </p>
                        <div className='student_details'>
                            <img src="https://watermark.lovepik.com/photo/50169/0876_lovepik-female-college-students-review-carefully-in-the-photo-image_wh1200.jpg" alt="student" />

                            <span className='about_student'>
                                <span className='student_name' style={{ width: "150px", marginLeft: "0px" }}>Harshu Reddy
                                    <p style={{ margin: "1px", textAlign: "center", width: "15px" }}>Student</p>
                                </span>

                                <p className='student_rating' style={{ backgroundColor: "maroon", width: "50px", color: "white", textAlign: "center" }}>4⭐</p>
                            </span>
                        </div>
                    </div>

                </div>
                <div className='student_reviews_right'>

                </div>

            </div>
        </div>
    )
}

export default Student_reviews