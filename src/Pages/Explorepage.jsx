import React, { useEffect, useState } from 'react'
import "../Styles/Explorepage.css";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Explorepage() {
    const [data, setData] = useState([]);
    const navigate=useNavigate();
    async function Fetch_categories() {
        const res = await axios.get("https://edudev-server-1.onrender.com/Get_all_categories");
        if (res.status === 200) {
            setData(res.data);
        }
    }
    useEffect(() => {
        Fetch_categories();
    }, [])
    return (

        <div className='explore'>
            <div className='mini_gurantees'>
                <span className='mini_item item_1'>
                    <AccessTimeFilledIcon fontSize="large" />
                    <h3>20k+ Courses</h3>
                </span>

                <span className='mini_item item_1'>
                    <LockRoundedIcon fontSize="large" />
                    <h3>Lifetime Access</h3>
                </span>

                <span className='mini_item item_1'>
                    <LockOpenRoundedIcon fontSize="large" />
                    <h3>Value For Money</h3>
                </span>

                <span className='mini_item item_1'>
                    <SupportAgentRoundedIcon fontSize="large" />
                    <h3>Lifetime Support</h3>
                </span>
                <span className='mini_item item_1'>
                    <PeopleRoundedIcon fontSize="large" />
                    <h3>Community Support</h3>
                </span>
            </div>



            <div className='categories_explore'>
                <h3 className='category_heading'>#Categories</h3>
                <div className='category_title_box'>
                    <h1 className='categoty_title'>Explore Top <span style={{ color: "tomato" }}>Categories </span></h1>
                    <span className='category_sub_quote'>
                        There are many variations of passages of courses are available on this website ,but majority have suffered alteration in some form,by injected humour
                    </span>
                </div>

                {/* category item code */}

                <div className='categotyitem_box'>
                    {data.length > 0 && Array.isArray(data) && data.map((item, i) => {
                        return (
                            <div className='categoty_item item_1' key={i} onClick={()=>navigate(`course_list/${item.name}`)}>
                                <img src="https://e7.pngegg.com/pngimages/651/48/png-clipart-web-development-responsive-web-design-web-developer-software-developer-outgoing-web-design-logo.png" alt='course_logo' />
                                <div className='categoryitem_course_details'>
                                    <span style={{ fontWeight: "600" }}>{item.name}</span>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Explorepage