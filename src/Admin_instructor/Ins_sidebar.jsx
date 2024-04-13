import "../AdminpanelComponents/sidebar.css";
import {
    LineStyle,
    PermIdentity,
    Storefront,
    Man2Outlined,
    MoneyOutlined,
} from "@mui/icons-material";
import { useState } from "react";

export default function Ins_sidebar({ selectedpage }) {

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
                            Courses
                        </li>

                        <li className={`sidebarListItem ${selected === 3 && "active"}`} onClick={() => setSelected(3)}>
                            <PermIdentity className="sidebarIcon" />
                            New Course
                        </li>



                        <li className={`sidebarListItem ${selected === 4 && "active"}`} onClick={() => setSelected(4)}>
                            <Storefront className="sidebarIcon" />
                            Books
                        </li>
                        <li className={`sidebarListItem ${selected === 5 && "active"}`} onClick={() => setSelected(5)}>
                            <Storefront className="sidebarIcon" />
                            New Book
                        </li>

                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Profile and Transactions</h3>
                    <ul className="sidebarList" >

                        <li className={`sidebarListItem ${selected === 6 && "active"}`} onClick={() => setSelected(6)} >
                            <Man2Outlined  className="sidebarIcon" />
                            Profile
                        </li>

                        <li className={`sidebarListItem ${selected === 7 && "active"}`} onClick={() => setSelected(7)} >
                            <MoneyOutlined  className="sidebarIcon" />
                            Transcations
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
}