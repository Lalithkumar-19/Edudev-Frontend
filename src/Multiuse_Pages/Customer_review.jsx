import React from 'react'
import "./Customer_review.css";
function Customer_review() {
    return (
        <div className='customer_review'>
            <p className='review_content' style={{padding:"3px",lineHeight:"22px"}}>
            The courses are engaging, the instructors are knowledgeable and supportive, and the resources provided are invaluable. 
            </p>
            <div className='student_details'>
                <img className='customer_pic' src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="student" />

                <span className='about_student'>
                    <span className='student_name' style={{ width: "150px", marginLeft: "0px",fontWeight:"500" }}>Harshu Reddy
                        <p style={{ margin: "1px", textAlign: "center", width: "15px" }}>Student</p>
                    </span>

                    <p className='student_rating' style={{ backgroundColor: "maroon", width: "50px", color: "white", textAlign: "center" }}>4.5⭐</p>
                </span>
            </div>
        </div>
    )
}

export default Customer_review