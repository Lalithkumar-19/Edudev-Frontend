import React, { useEffect, useState } from 'react'
import "../Styles/All_Instructors.css";
import Team_member_card from './Team_member_card';
import Navbar from './Navbar';
import FooterPage from './FooterPage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

function All_Instructors() {
    const [instructors, setInstructors] = useState([]);
    const Fetch_ins = async () => {
        try {
            const res = await axios.get("https://edudev-server-1.onrender.com/fetch_all_ins?limit=10&skip=0");
            if (res.status === 200) {
                setInstructors(res.data);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        Fetch_ins();
    }, [])
    return (
        <div className='all_instructors'>
            <Navbar />
            <header className='all_instructors_header'>
                <h1 className='all_instructors_title'>
                    Instructors
                </h1>
                <span className='all_instructors_sub_title'>
                    Home/<span className='all_instructors_sub_sub_title'>
                        Instructors
                    </span>
                </span>
            </header>
            <section className='all_instructors_main'>
                {Array.isArray(instructors) ? (
                    <>
                        {instructors.map((item, i) => {
                            return <Team_member_card key={i} id={item._id} name={item.instructor_name} role={item.profession} socialmedia={item.social_media} />
                        })}
                    </>
                ) : <CircularProgress />
                }
            </section>

            <FooterPage />
        </div>
    )
}

export default All_Instructors