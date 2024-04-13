import FeaturedInfo from "../AdminpanelComponents/FeaturedInfo";
import Chart from "../AdminpanelComponents/Chart";
import WidgetSm from "../AdminpanelComponents/WidgetSm";
import WidgetLg from "../AdminpanelComponents/WidgetLg";
import "./adminhome.css";
import axios from "axios";
import { useEffect, useState } from "react";
export default function AdminHome() {
  const [data, setData] = useState([]);

  const Fetch_Users_per_month = async () => {
    try {
      const res = await axios.get(`https://edudev-server-1.onrender.com/Get_Users_per_month?token=${localStorage.getItem("admin_token")}`);
      if (res.status === 200) {
        setData(res.data);
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    Fetch_Users_per_month();
  }, [])
  return (
    <div className="Adminhome">
      <FeaturedInfo />{
        data && data.length !== 0 && (
          <Chart data={data} title="User Analytics" grid dataKey="registeredUsers" />
        )
      }
      <div className="AdminhomeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}