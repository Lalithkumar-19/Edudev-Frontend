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
        <div className='bookcard' >
            <Toaster
                position="bottom-right"
                reverseOrder={true}
            />
            <section className='bookcard_top'>
                <img src={backdrop} width={"100%"} className='book_pic' height={"100%"} style={{ borderRadius: "13px" }} alt='book_pic' />
                <span className='book_offer'>
                    20% off
                </span>
            </section>
            <section className='book_details'>
                <p className='book_name' style={{ cursor: "pointer" }} onClick={() => navigate("/bookshopping/selected_book/" + id)}>{name}</p>
                <p className='about_book'>{aboutbook}</p>
                <div className='book_cost'>
                    <span className='full_cost'> ₹ {acualcost}</span>
                    <span className='actual_cost'> ₹ {discountcost}</span>
                </div>
                {
                    !admin ? (
                        <>
                            <div className='book_buttons'>
                                <button className='add_to_card' onClick={()=>{addtocart()}} >Add to Card</button>
                                <span className='review_stars'>
                                    ⭐ ⭐ ⭐ ⭐ ⭐
                                </span>
                            </div>

                        </>
                    ) : <EditBook_modal id={id} />
                }


            </section>

        </div>
    )
}

export default Bookcard