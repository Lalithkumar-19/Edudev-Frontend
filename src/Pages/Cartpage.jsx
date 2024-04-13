import React, { useEffect } from 'react'
import "../Styles/Cartpage.css";
import Navbar from './Navbar';
import Cart_Page_item from '../Multiuse_Pages/Cart_Page_item';
import Contactpage from './FooterPage';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Cartpage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function GetUser_details() {
        try {
            const res = await axios.get("https://edudev-server-1.onrender.com/get_user_cart_wishlist?token=" + localStorage.getItem("token"));
            if (res.status === 200) {
                dispatch({ type: "User_cart_wishlist", payload: res.data });
                dispatch({ type: "Update_cart_length", payload: Array.isArray(res.data) ? res.data.length : 0 });
                const totalBookPrice = res.data.cart.reduce((accumulator, item) => {
                    const bookPrice = parseFloat(item.product_details?.book_price); // Convert to float for numeric addition
                    return accumulator + bookPrice;
                }, 0);
                console.log(totalBookPrice, "price");
                dispatch({ type: 'Total_price', payload: totalBookPrice })
                console.log(res.data);
            }
            else {
                console.log("error occured while reaching or fetching api ")
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        GetUser_details();
    }, [dispatch])


    const cartData = useSelector((data) => data.cart);
    const cart_total = useSelector((data) => data.cartsum);
    console.log(cartData);
    return (
        <div className='cart_page'>
            <Navbar />
            <header className='cart_page_header'>
                <h1 className='cart_main_title'>Cart Page</h1>
                <span className='cart_sub_title'>
                    Home/<span className='cart_sub_sub_title'>Cart Page</span>
                </span>

            </header>
            {Array.isArray(cartData) && cartData.length !== 0 ? (
                <>
                    {Array.isArray(cartData) && cartData.length > 0 && cartData.map((item, i) => {
                        return item && <Cart_Page_item id={item._id} item_name={item.product_details?.title} item_owner={"trusted partner"} item_pic={item.product_details?.book_pics[0]} item_price={item.product_details?.book_price} key={item._id} />
                    })}


                    <section className='cart_page_main'>
                    </section>
                    <footer className='cart_page_footer'>
                        <section className='coupon_apply_div'>
                            <input className='coupon_input' type='text' placeholder=' Enter Coupon Code' />
                            <button className='apply_coupon_button' id='button'>Apply Coupon</button>

                        </section>
                        <section className='cart_totals'>
                            <h1 className='cart_totals_head_title'>Cart Totals</h1>
                            <div className='subtotal'>
                                <span className='header_title'>
                                    Subtotal
                                </span>
                                <span className='total_price'>
                                    $ {cart_total}
                                </span>
                            </div>


                            <div className='shipping'>
                                <span className='header_title'>
                                    Shipping
                                </span>
                                <span className='shipping_info'>
                                    Free
                                </span>
                            </div>


                            <div className='grandtotal'>
                                <span className='header_title'>
                                    Total
                                </span>
                                <span className='total_price'>
                                    $ {cart_total}
                                </span>
                            </div>
                            <button className='proceed_button' id='button' onClick={() => navigate("/yourcart/checkout")}>
                                Proceed to Checkout
                            </button>

                        </section>

                    </footer>
                </>) : (<>
                    <span style={{ color: "black", margin: "0 auto", fontSize: "29px", fontWeight: "800" }} >No items in your cart :))</span>
                    <img width="80%" height="400px"style={{margin:"0 auto"}} src='https://fatafatsewa.com/website/images/emptycart.png' alt='cart_empty'/>
                </>)}
            <Contactpage />

        </div>
    )
}

export default Cartpage