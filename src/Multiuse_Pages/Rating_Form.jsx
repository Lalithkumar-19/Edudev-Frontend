import React from 'react'

function Rating_Form({Title}) {

    const [RatingValue, setRating] = useState(0);
    const [title, setTitle] = useState(0);
    const [name, setName] = useState(0);
    const [email, setemail] = useState(0);
    const [website, setWebsite] = useState(0);
    console.log(RatingValue);


    return (
        <section className='new_review_form' id='new_review_form'>
            <h1 className='review_header_title'>Write a Review</h1>

            <Rating
                name="simple-controlled"
                value={RatingValue}
                onChange={(event, newValue) => {
                    setRating(newValue);
                }}
            />

            <form className='review_taken_form'>
                <input className='review_title' placeholder='Review Title' type='text' name='review_title' />
                <input className='reviewer_name' placeholder='Reviewer Name' name='reviewer_name' type='text' />
                <input className='reviewer_email' placeholder='Email' name='reviewer_email' type='email' />
                <input className='reviewer_website' placeholder='Website' name='reviewer_website' type='text' />
                <button type='submit' id='button' className='submit_button' onClick={()=>{""}} >
                    Submit Review
                </button>


            </form>
        </section>
    )
}

export default Rating_Form