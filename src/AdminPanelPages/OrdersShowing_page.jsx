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
                    <div className="table_responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Payment</th>
                                    <th>Address</th>
                                    <th>Delivered?</th>
                                    <th>Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Orders.map((item) => (
                                    <tr key={item._id}>
                                        <td>
                                            <div className="product_names">
                                                {Array.isArray(item.products) && item.products.map((it, idx) => (
                                                    <span key={idx}>{it.name}{idx < item.products.length - 1 ? ", " : ""}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="amount_cell">₹{item.subtotal}</td>
                                        <td>
                                            <span className={`status_badge ${item.delivery_status.toLowerCase().replace(/\s/g, '_')}`}>
                                                {item.delivery_status}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`payment_badge ${item.payment_status.toLowerCase()}`}>
                                                {item.payment_status}
                                            </span>
                                        </td>
                                        <td className="address_cell">
                                            {item.shipping.address.city}, {item.shipping.address.line1}
                                        </td>
                                        <td>
                                            <select
                                                className="status_select"
                                                value={item.delivery_status}
                                                onChange={(ev) => Change_delivery_status(item._id, ev.target.value)}
                                            >
                                                {status_options.map((val, i) => (
                                                    <option key={i} value={val}>{val}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>{item.shipping.phone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            {Orders.length === 0 && (
                <div className="no_orders_state">
                    <h3>No orders found</h3>
                    <p>New orders will appear here once customers make a purchase.</p>
                </div>
            )}


        </div>
    );
}

export default OrdersShowing_page;