import React from 'react'
import "../Multiuse_Pages/Bookcard.css";
import { useDispatch } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import EditBook_modal from '../Modals/EditBook_modal';


function Bookcard({ id, backdrop, name, acualcost, discountcost, aboutbook, admin }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addtocart = () => {
        if (localStorage.getItem("token") && localStorage.getItem("userdata")) {
            dispatch({ type: "ADD_TO_CART", payload: { id: id } });
            toast.success("Added succesffully");
        } else {
            toast.error("Please login to proceed..")
        }
    }

    return (
        <div className='bookcard'>
            <Toaster
                position="bottom-right"
                reverseOrder={true}
            />
            <section className='bookcard_top'>
                <div className='book_pic_container'>
                    <img src={backdrop} className='book_pic' alt='book_pic' />
                </div>
                <span className='book_offer'>
                    20% OFF
                </span>
            </section>
            <section className='book_details'>
                <div className='book_info_group'>
                    <h3 className='book_name' onClick={() => navigate("/bookshopping/selected_book/" + id)}>{name}</h3>
                    <p className='about_book'>{aboutbook}</p>
                </div>

                <div className='book_footer'>
                    <div className='book_cost'>
                        <span className='actual_cost'>₹{discountcost}</span>
                        <span className='full_cost'>₹{acualcost}</span>
                    </div>

                    {
                        !admin ? (
                            <div className='book_actions'>
                                <button className='add_to_cart_btn' onClick={() => { addtocart() }} >Add to Cart</button>
                            </div>
                        ) : (
                            <div className='admin_actions'>
                                <EditBook_modal id={id} />
                            </div>
                        )
                    }
                </div>
            </section>
        </div>
    )
}

export default Bookcard