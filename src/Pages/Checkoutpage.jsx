import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import "../Styles/Checkoutpage.css";
import Contactpage from './FooterPage';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';


function Checkoutpage() {

    const dispatch = useDispatch();
    const cartData = useSelector((data) => data.cart);
    const cart_total = useSelector((data) => data.cartsum);
    useEffect(() => {
        const totalBookPrice = cartData.reduce((accumulator, item) => {
            const bookPrice = parseInt(item.product_details?.book_price); // Convert to float for numeric addition
            return accumulator + bookPrice;
        }, 0);
        console.log(totalBookPrice, "price");
        dispatch({ type: 'Total_price', payload: totalBookPrice })
    }, []);

    const stripePromise = loadStripe("pk_test_51NytQZSCR13VXk2t4xS5scD4w4R3pGSOYJnkvFd21myYOBWy8Iurot26oRpg03sam9shpg9jePFNk1CQ50LoZvSS00cDpJcctn");



    const handlecheckout = async () => {
        const res = await axios.post('https://edudev-server-1.onrender.com/checkout', { cartItems: cartData, userId: localStorage.getItem("id") });
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: res.data.id });

    }




    return (
        <div className='checkout_page'>
            <Navbar />
            <header className='checkout_page_header'>
                <h1 className="checkout_page_header_title">Checkout</h1>
                <span className='checkout_page_header_sub_title'>
                    Home/Yourcart/ <span className='checkout_page_header_sub_sub_title'>Checkout</span>
                </span>
            </header>
            <section className='checkout_page_main'>

                <div className='checkout_page_main_right'>
                    <section className='final_checkout_details'>
                        <h1 className='final_checkout_details_title'>
                            Your Orders
                        </h1>
                        <div className='final_checkout_details_items'>
                            {
                                Array.isArray(cartData) && cartData.map((item, index) => {
                                    return (
                                        <>
                                            <span className='item' key={index}>
                                                <span className='item_name'>{item.product_details?.title}</span>
                                                <span className='item_price'>₹{item.product_details?.book_price}</span>
                                            </span>

                                        </>
                                    )
                                })
                            }


                        </div >

                        <div className='subtotal_price'>
                            <span className='subtotal_price_item item'>
                                <span className='title'>Sub total</span>
                                <span className='price'>₹{cart_total}</span>
                            </span>
                            <span className='door_step_delivery item'>
                                <span className='title'>Door Step Delivery</span>
                                <span className='price'>Free</span>
                            </span>

                            <span className='order_total item'>
                                <span className='title'>Order total</span>
                                <span className='price'>₹{cart_total}</span>
                            </span>
                        </div>
                        <button className='proceed_to_checkout' id="button" onClick={handlecheckout} >Proceed to Checkout</button>
                    </section>

                </div>
            </section>

            <Contactpage />


        </div>
    )
}

export default Checkoutpage