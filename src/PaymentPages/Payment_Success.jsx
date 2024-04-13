import React, { useEffect } from 'react'
import "./Payment_Success.css";
import Navbar from '../Pages/Navbar';
import Contactpage from '../Pages/FooterPage';
import { useNavigate } from 'react-router-dom';
import Payment_success_pic from "../assets/Payment_success.png";
import axios from 'axios';
import toast from 'react-hot-toast';
function Payment_Success() {
    const navigate = useNavigate();
    useEffect(() => {
        try {
            const fetch_payment_Details = async () => {
                const res = await axios.post(`https://edudev-server-1.onrender.com/get_payment_details/${localStorage.getItem("stripe_Session")}`);
                if (res.status === 200) {
                    console.log(res.data);
                } else {
                    toast.error("error occured while fetching the receipt")
                }
            }
            fetch_payment_Details();
        } catch (error) {
            toast.error("failed to load data");
            console.log(error);
        }
    }, [])
    return (

        <div className='payment_success'>
            <Navbar />
            <header className='payment_success_header'>
                <h1 className='payment_success_header_title'>Success</h1>
                <span className='payment_success_header_sub_title'>
                    Home/YourCart/Checkout/<span className='payment_success_header_sub_sub_title'>Success</span>
                </span>
            </header>
            <section className='payment_success_main'>
                <div className='payment_success_main_inner'>
                    <div className='success_image'>
                        <img id='payment_success_image' src={Payment_success_pic} alt="success_img" width={"100%"} height={"100%"} />
                    </div>
                    <h1 style={{ marginLeft: "0px", color: "coral", marginBottom: "6px" }}>Payment Successfull</h1>
                    <p style={{ textAlign: "center" }}>Your Order placed successfully</p>
                    <div className='buttons_for_navigation'>
                        
                        <button className='back_to_home' id='button' onClick={() => navigate("/")}>
                            Back Home
                        </button>
                    </div>
                </div>
            </section>
            <Contactpage />
        </div>
    )
}

export default Payment_Success