import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  Storefront,
  AttachMoney,
  WorkOutline,
  Approval,
  LocalMall,
} from "@mui/icons-material";
import { useState } from "react";

export default function Sidebar({ selectedpage }) {

  const [selected, setSelected] = useState(1);
  selectedpage(selected);


  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">

            <li className={`sidebarListItem ${selected === 1 && "active"}`} onClick={() => setSelected(1)}>
              <LineStyle className="sidebarIcon" />
              Home
            </li>

          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">

            <li className={`sidebarListItem ${selected === 2 && "active"}`} onClick={() => setSelected(2)}>
              <PermIdentity className="sidebarIcon" />
              Users
            </li>

            <li className={`sidebarListItem ${selected === 3 && "active"}`} onClick={() => setSelected(3)}>
              <PermIdentity className="sidebarIcon" />
              New User
            </li>



            <li className={`sidebarListItem ${selected === 4 && "active"}`} onClick={() => setSelected(4)}>
              <Storefront className="sidebarIcon" />
              Products
            </li>
    

            <li className={`sidebarListItem ${selected === 5&& "active"}`} onClick={() => setSelected(5)}>
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            <li className={`sidebarListItem ${selected === 6 && "active"}`} onClick={() => setSelected(6)}>
              <AttachMoney className="sidebarIcon" />
              Courses
            </li>
            <li className={`sidebarListItem ${selected === 10 && "active"}`} onClick={() => setSelected(10)}>
              <LocalMall className="sidebarIcon" />
              Orders
            </li>




          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Instructors</h3>
          <ul className="sidebarList" >
            <li className={`sidebarListItem ${selected === 8&& "active"}`} onClick={() => setSelected(8)}>
              <WorkOutline className="sidebarIcon" />
              Instructors Manage
            </li>
            <li className={`sidebarListItem ${selected === 9 && "active"}`} onClick={() => setSelected(9)}>
              <Approval className="sidebarIcon" />
              Applications
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}