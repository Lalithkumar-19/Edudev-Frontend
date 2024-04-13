import React, { useEffect, useState } from 'react'
import "../UsersPFPages/orderspage.css"
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
function OrdersShowing_page() {
    const [Orders, setOrders] = useState([]);
    const Change_delivery_status = async (id, status) => {
        try {
            const res = await axios.put(`https://edudev-server-1.onrender.com/Change_order_status?token=${localStorage.getItem("admin_token")}`, { id: id, delivery_status: status });
            if (res.status === 200) {
                Fetch_all_orders();
                toast.success("Delivery status changed successfully");
            }
            else {
                toast.error("Error occured while changing delivery status")
                console.log("not fetched data");
            }

        } catch (error) {
            console.log(error);
        }
    }
    const Fetch_all_orders = async () => {
        try {
            const res = await axios.get(`https://edudev-server-1.onrender.com/Get_all_orders_Admin?token=${localStorage.getItem("admin_token")}`);
            if (res.status === 200) {
                setOrders(res.data);
                console.log("admin", res.data);
            }
            else {
                console.log("not fetched data");
            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        Fetch_all_orders();
    }, []);
    const status_options = ["pending", "confirmed", "Near to you", "Delivered"];


    return (
        <div className='orders_container'>
            <Toaster />
            <header className="orders_header">
                <h2 className='header_top'>Orders <span style={{ color: "coral" }}>Page</span></h2>
            </header>{
                Orders.length !== 0 &&

                <div className='all_orders'>

                    <table style={{ overflow: "scroll" }} >
                        <tr>
                            <th>Product</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Address</th>
                            <th>Delivered?</th>
                            <th>Phone Number</th>

                        </tr>
                        {
                            Orders && Orders.map((item) => {
                                return (
                                    <>
                                        <tr key={item._id}>
                                            <td>{Array.isArray(item.products) && item.products.map((it) => {
                                                return it.name + " ,";
                                            })}</td>
                                            <td>{item.subtotal}</td>
                                            <td style={{ color: "red", fontSize: "18px" }}>{item.delivery_status} </td>
                                            <td>{item.payment_status}</td>
                                            <td>{item.shipping.address.city},{item.shipping.address.line1}</td>
                                            <td><select onChange={(ev) => {
                                                Change_delivery_status(item._id, ev.target.value);
                                            }}>
                                                <option value={item.delivery_status}>{item.delivery_status}</option>
                                                {status_options.map((val, i) => {
                                                    if (val !== item.delivery_status) {
                                                        return <option key={i} value={val}>{val}</option>
                                                    }
                                                })}

                                            </select>
                                            </td>
                                            <td>{item.shipping.phone}</td>


                                        </tr>
                                    </>
                                )
                            })
                        }
                    </table>
                </div>
            }
            {Orders.length === 0 && (
                <>
                    <h1>No orders there</h1>
                </>
            )}


        </div>
    );
}

export default OrdersShowing_page;