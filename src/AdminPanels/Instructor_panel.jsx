import React from 'react'
import "./Admin.css";
import Ins_topbar from '../Admin_instructor/Ins_topbar';
import Ins_sidebar from '../Admin_instructor/Ins_sidebar';
import { useState } from 'react';
import { useEffect } from 'react';
import Ins_home from '../Admin_instructor/Ins_home';
import Courses_by_ins from '../Admin_instructor/Courses_by_ins';
import New_course from '../Admin_instructor/New_course';
import New_book from '../Admin_instructor/New_book';
import Profile from '../Admin_instructor/Profile';
import WidgetLg from '../AdminpanelComponents/WidgetLg';
import All_books from '../Admin_instructor/All_books';

function Instructor_panel() {
    const [Selected, setSelected] = useState(1);

    const handlepages = () => {
        switch (Selected) {
            case 1:
                return <Ins_home />
                break;
            case 2:
                return <Courses_by_ins />
                break;
            case 3:
                return <New_course />
                break;
            case 4:
                return <All_books />
                break;
            case 5:
                return <New_book />
                break;
            case 6:
                return <Profile />
                break;
            case 7:
                return <WidgetLg />
                break;

            default:
                return <Ins_home />
                break;


        }
    };
    useEffect(() => {
        handlepages();
    }, [])

    return (
        <div className='admin_page'>
            <Ins_topbar setSelected={setSelected} />
            <div className='admin_page_container'>
                <Ins_sidebar selectedpage={setSelected} />
                <div className='other_pages'>
                    {
                        handlepages()
                    }
                </div>
            </div>
        </div>
    )
}

export default Instructor_panel