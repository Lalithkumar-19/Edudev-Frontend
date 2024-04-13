import { useEffect, useState } from "react";
import UserEdit_Modal from "../Modals/UserEdit_Modal";
import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

export default function WidgetSm() {
  const [data, setData] = useState([]);
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`http:///localhost:5000/get_all_new_joined_users?token=${localStorage.getItem("admin_token")}`);
      if (res.status === 200) {
        setData([...res.data]);
      }
      else {
        toast.error("unable to connect to our servers");
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">

        {
          data.length === 0 ? <CircularProgress /> : (
            <>
              {
                data.map((item, i) => {
                  return (
                    <li className="widgetSmListItem" key={i}>
                      <img
                        src={item.dp}
                        alt="dp"
                        className="widgetSmImg"
                      />
                      <div className="widgetSmUser">
                        <span className="widgetSmUsername">{item.name}</span>
                        <span className="widgetSmUserTitle">{item.profession}</span>
                      </div>
                      <UserEdit_Modal view={true} data={item} User_id={item._id} />
                    </li>
                  )
                })
              }

            </>
          )
        }
      </ul>
    </div>
  );
}