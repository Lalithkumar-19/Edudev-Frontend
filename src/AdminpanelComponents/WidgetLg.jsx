import { useEffect, useState } from "react";
import "./widgetLg.css";
import axios from "axios";
import { format } from "date-fns";

export default function WidgetLg() {
  const [Orders, setOrders] = useState([]);
  const Fetch_all_orders = async () => {
    try {
      const res = await axios.get(`https://edudev-server-1.onrender.com/Get_all_orders_Admin?token=&{localStorage.getItem("admin_token")}`);
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

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>

        {Orders.length !== 0 && Orders.map((item, i) => {
          return (
            <tr className="widgetLgTr" key={i}>
              <td className="widgetLgUser">
                <img
                  src={"https://edudev-server-1.onrender.com/" + item.userId.dp}
                  alt="user image"
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{item.shipping.name}</span>
              </td>
              <td className="widgetLgDate">{format(new Date(item.createdAt), " d-mm-yyyy")}</td>
              <td className="widgetLgAmount">₹{(item.subtotal)/100}</td>
              <td className="widgetLgStatus">
                <Button type="Approved" >{item.payment_status}</Button>
              </td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}