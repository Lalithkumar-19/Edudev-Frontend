import React, { useState } from 'react'
import "./Cart_Page_item.css"
import Delete from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';


function Cart_Page_item({ id, item_pic, item_name, item_owner, item_price }) {
    const [quantValue, setQuantvalue] = useState(1);
    const dispach = useDispatch();
    const Remove_from_cart = () => {
        dispach({ type: "remove_from_cart", payload: id });
    }

    return (
        <div className='cart_page_item'>

            <div className='item_img_div'>
                <img src={item_pic} width="100%" height={"100%"} style={{ borderRadius: "10px" }} alt="cart_prodcut_img" />
            </div>

            <div className='item_info'>
                <span className='item_name'>
                    {item_name}
                </span>
                <span className='item_owner'>
                    {item_owner}
                </span>
            </div>

            <div className='item_price'>
                <span className='price'>
                    ₹{item_price}
                </span>
            </div>
            <div className='item_quantity'>
                <span className='quantity_number'>
                    {quantValue}
                </span>
                <span className='quantity_changer'>
                    <span className='up' onClick={() => setQuantvalue(p => p + 1)}>^</span>
                    <span className='down' onClick={() => {
                        if (quantValue === 1) {
                            setQuantvalue(1);
                        }
                        else {
                            setQuantvalue(p => p - 1);
                        }


                    }}>˅</span>
                </span>
            </div>
            <div className='total_amount'>
                <span style={{ color: "coral" }} className='total_quantity_amount'>
                    ₹ {quantValue * item_price}
                </span>
            </div>
            <span onClick={Remove_from_cart}>
                <Delete sx={{ color: "coral" }} />
            </span>

        </div>

    )
}

export default Cart_Page_item