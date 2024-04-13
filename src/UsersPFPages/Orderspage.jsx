import React from 'react';
import Navbar from '../Pages/Navbar';
import Contactpage from '../Pages/FooterPage';
import "./orderspage.css";
import { useSelector } from "react-redux"

function OrdersPage() {
    const Orders = useSelector(state => state.orders);
    // Sample data for orders

    return (
        <div className='orders_container'>
            <Navbar />
            <header className="orders_header">
                <h2 className='header_top'>Home/<span style={{ color: "coral" }}>my orders</span></h2>
            </header>
            {Orders&&
            <div className='all_orders'>

                <table >
                    <tr>
                        <th>Product</th>
                        <th>Total</th>
                        <th>Payment Status</th>
                        <th>delivery Status</th>

                    </tr>
                    {
                        Orders && Array.isArray(Orders) && Orders.map((item, index) => {
                            return (
                                <>
                                    <tr key={index}>
                                        <td>{Array.isArray(item.products) && item.products.map((it, i) => {
                                            return it.name +" , " 
                                        })}</td>
                                        <td>Rs.{(item.subtotal)/100}</td>
                                        <td style={{ color: "red", fontSize: "18px" }}>{item.payment_status}</td>
                                        <td style={{ color: "red", fontSize: "18px" }}>{item.delivery_status}</td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </table>
            </div>
}
{!Orders&&(
    <>
    <h1 style={{textAlign:"center",margin:"0 auto",marginTop:"30px"}}>No orders placed yet</h1>
    </>
)}


            {/* <Contactpage /> */}
        </div>
    );
}

export default OrdersPage;
