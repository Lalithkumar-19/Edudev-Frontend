import React from 'react';
import "./Contact_page.css";
import Navbar from '../Pages/Navbar';
import { EmailRounded, LocationCityOutlined, PhoneCallback, PhoneCallbackRounded } from '@mui/icons-material';
import Contactpage from '../Pages/FooterPage';

function Contact_page() {
    return (
        <div className='contact_page'>
            <Navbar />
            <header className='contact_page_header'>
                <h1 className='contact_page_header_title'>
                    Contact Us
                </h1>
                <span className='contact_page_header_sub_title'>
                    Home/<span className='contact_page_header_sub_sub_title'>
                        Contact Us
                    </span>
                </span>
            </header>

            <section className='contact_page_main_details'>
                <div className='main_element location'>
                    <span className='icon'><LocationCityOutlined fontSize='large' /></span>
                    <div className='main_element_desc'>
                        <h1 className='main_element_title'>Our Location</h1>
                        <p className='main_element_sub_dec'>Tirupathi ,A.p</p>
                    </div>
                </div>
                <div className='main_element emailAndweb'>
                    <span className='icon'><EmailRounded fontSize='large' /></span>
                    <div className='main_element_desc'>
                        <h1 className='main_element_title' style={{ marginLeft: "0px", marginBottom: "2px" }}>Email and Website</h1>
                        <p className='main_element_sub_dec'>Support.edudev@gmail.com</p>
                    </div>
                </div>
                <div className='main_element location'>
                    <span className='icon'><PhoneCallbackRounded fontSize='large' /></span>
                    <div className='main_element_desc'>
                        <h1 className='main_element_title'>Phone & Fax</h1>
                        <p className='main_element_sub_dec'>Mobile: +143-897-8383-948

                        </p>

                    </div>
                </div>


            </section>
            <section className='contact_page_msg_me_form'>

                <form className='contact_us_form'>
                    <h1>Send Us Message</h1>
                    <label className='contact_form_lable'>Name</label>
                    <input type='text' placeholder="  Enter Name" className='contact_form_input' />

                    <label className='contact_form_lable'>Email Address</label>
                    <input type='Email Address' placeholder='  Email Address' className='contact_form_input' />

                    <label className='contact_form_lable'>Phone</label>
                    <input type='number' placeholder='  Phone Number' className='contact_form_input' />

                    <label className='contact_form_lable'>Message</label>
                    <textarea placeholder='  Write a message' style={{ resize: "none" }} />
                    <button id='button' className='send_button' type='submit' >Submit Now</button>


                </form>


            </section>
            <Contactpage />



        </div>
    )
}

export default Contact_page