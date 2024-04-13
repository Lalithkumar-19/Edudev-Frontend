import React from 'react';
import "../Styles/Footerpage.css";
import { Link } from 'react-router-dom';
import { FacebookOutlined, LinkedIn, Twitter } from '@mui/icons-material';

function Contactpage() {
    return (
        <div className='Contactpage' id="Contact_page">
            <div className='contactpage_main'>
                <section className='company_logo'>
                    <h2 style={{ color: "blue", fontFamily: "monospace", fontWeight: "700" }}>EduDev</h2>
                </section>
                <section className='company_links'>
                    <h1 className='links_title'> Links</h1>
                    <div className='all_links'>
                        <span className='link'> <Link to={"/"}>Home</Link> </span>
                        <span className='link'> <Link to={"/instructors"}>Instructors</Link> </span>
                        <span className='link'> <Link to={"/"}>About</Link> </span>
                        <span className='link'> <Link to={"/blogs"}>Blogs</Link> </span>
                        <span className='link'> <Link to={"/bookshopping"}>Books</Link> </span>
                        <span className='link'> <Link to={"/apply_instructor"}>Apply instructor</Link> </span>


                    </div>
                </section>
                <section className='company_legals'>
                    <h1 className='legal_title' style={{ marginLeft: "0px" }}>LEGAL</h1>
                    <div className='all_legals'>
                        <span className='link'> <Link to={"/"}>Terms of Use</Link> </span>
                        <span className='link'> <Link to={"/"}>Terms & Conditions</Link> </span>
                        <span className='link'> <Link to={"/"}>Private Policy</Link> </span>
                        <span className='link'> <Link to={"/"}>Cookie Policy</Link> </span>
                    </div>

                </section>
                <section className='news_letter'>
                    <span className='news_letter_head_line'>NEWSLETTER</span>
                    <span className="news_letter_sub_head_line">
                        Join over 78,000 people getting our emails
                    </span>
                    <div className='input_div'>
                        <input type='email' placeholder='Enter your email' className='email_input' />
                        <button className='email_button'>Subscribe Now!</button>

                    </div>
                </section>
            </div>
            <footer className='contact_footer'>
                <div className='main_policy'>
                    <span className='privacy'>
                        Privacy & Terms
                    </span>
                    <span className='contact_us'>
                        Contact us
                    </span>
                </div>
                <div className='rights_reserved'>
                    © Copyrights 2021. All Rights Reserved by Lalith Kumar
                </div>
                <div className='soial_media_links'>
                    <span className='fb_link'>
                        <FacebookOutlined />
                    </span>
                    <span className='twitter_link'>
                        <Twitter />
                    </span>
                    <span className='linkedin_link'>
                        <LinkedIn />
                    </span>
                </div>
            </footer>
        </div>
    )
}

export default Contactpage