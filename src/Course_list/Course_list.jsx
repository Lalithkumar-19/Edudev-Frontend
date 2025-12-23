import React, { useEffect, useState } from 'react'
import "./Course_list.css";
import Navbar from '../Pages/Navbar';
import { CancelRounded, SearchOutlined } from '@mui/icons-material';
import Contactpage from '../Pages/FooterPage';
import AppsIcon from '@mui/icons-material/Apps';
import ListIcon from '@mui/icons-material/List';
import Coursecard from '../Pages/Coursecard';
import Course_card_line_align from '../Course_line_align/Course_card_line_align';
import Slider from '@mui/material/Slider';
import axios from 'axios';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';




function Course_list() {
    //for filtering 
    const [filtering_for_sm, Set_filtering_for_sm] = useState(false);
    const [alignline, SetAlignline] = useState(false);

    const [search, setSearch] = useState("");
    const [priceRange, setPricerange] = useState(2280);
    const [rating, setRating] = useState(5);

    const [Data, setdata] = useState([]);
    const [zero_res, SetZeroResult] = useState(false);
    // setSearch(search_word);
    const [Screen_small, setScreen_small] = useState(false);
    //for storing real values fetched from server;
    const [categories_Data, setCategories_data] = useState([]);
    const [Instructors_data, setInstructorsData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedInstructor, setSelectedInstructor] = useState("");
    const [showing_courses_no, setShowing_courses_no] = useState(0);
    const [total_courses_no, setTotal_courses_no] = useState(0);
    // Function to handle checkbox change
    const handleCheckboxChange = (categoryName) => {
        setSelectedCategory(categoryName);
    };


    useEffect(() => {
        if (window.innerWidth <= 600) {
            setScreen_small(true);
        }
        else {
            setScreen_small(false);
        }

    }, [])
    console.log("data is", Data);


    //for Responsiveness of website
    useEffect(() => {
        if (document.readyState === "complete") {
            if (Screen_small) {
                let filters = document.getElementById("all_filters");
                if (filtering_for_sm) {
                    filters.style.display = "flex";
                    document.body.style.overflowY = "hidden";
                    document.body.style.opacity = 1.1;
                }
                else {
                    filters.style.display = "none";
                    document.body.style.overflowY = "scroll";
                    document.body.style.opacity = 1.2
                }

            }
        }

    }, [filtering_for_sm, Screen_small]);



    const getrangeValue = (value) => {
        setPricerange(value);
    };


    async function getfilteredResult() {
        try {
            const url = `https://edudev-server-1.onrender.com/api/course_list?search=${search}&category=${selectedCategory}&instructor=${selectedInstructor}&price=${priceRange}`
            const { data, status } = await axios.get(url);
            const { leng, total, courses } = data;
            setShowing_courses_no(leng);
            setTotal_courses_no(total);

            if (Array.isArray(courses) && courses.length === 0) {
                SetZeroResult(true);
            } else {
                SetZeroResult(false);
            }
            if ((courses) && (status === 200)) {
                setdata(courses);
                setSearch("");
            }
            if (Screen_small) {
                Set_filtering_for_sm(false);
            }
        } catch (error) {
            console.log("error occured while fetching from db for filters", error)
        }
    }


    useEffect(() => {
        getfilteredResult();
        setSearch("");
    }, [selectedCategory, selectedInstructor, priceRange]);

    async function Fetch_categories() {
        const res = await axios.get("https://edudev-server-1.onrender.com/Get_all_categories");
        if (res.status === 200) {
            setCategories_data(res.data);
        }
    }

    async function Fetch_Instructors() {
        const res = await axios.get("https://edudev-server-1.onrender.com/Get_all_top_instructor");
        if (res.status === 200) {
            setInstructorsData(res.data);
        }
    }

    useEffect(() => {
        Fetch_categories();
        Fetch_Instructors();
    }, [])



    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />
            <div className='course_list' id='course_list' style={{ padding: "1px" }}>
                <header className='course_list_header'>
                    <h1 className='course_list_header_title'>
                        Course List
                    </h1>
                    <span className='course_list_header_sub_title'>
                        Home/<span className='course_list_header_sub_sub_title'>
                            Course List
                        </span>
                    </span>
                </header>

                {/* main sections */}
                <section className='course_list_main'>

                    <section className='course_list_main_left'>
                        <div className='course_list_main_left_search_bar'>
                            <input className='search_input' value={search} onChange={(e) => setSearch(e.target.value)} style={{ textIndent: "6px" }} placeholder='Search...' />
                        </div>
                        {

                            <div className='all_filters' id='all_filters' >
                                {
                                    Screen_small ? (
                                        <>
                                            <span className='cancle_button' onClick={() => {
                                                window.scrollTo(0, 0);
                                                Set_filtering_for_sm(false)
                                            }} ><CancelRounded fontSize='large' sx={{ color: "coral" }} /></span>
                                        </>
                                    ) : ""
                                }


                                <div className='top_categories_filter'>
                                    <h1 className='top_categories_title'>Top Categories </h1>
                                    {categories_Data.length > 0 ? Array.isArray(categories_Data) && categories_Data.map((item, i) => {
                                        return (
                                            <div className='categoty_filter_item' key={i}>
                                                <input
                                                    className='checkbox'
                                                    name='category'
                                                    type='checkbox'
                                                    id={`checkboxes-${i}`}
                                                    style={{ backgroundColor: "coral", color: "coral", cursor: "pointer" }}
                                                    value={item.name}
                                                    checked={selectedCategory === item.name}
                                                    onChange={() => {
                                                        if (selectedCategory !== item.name) {
                                                            handleCheckboxChange(item.name);
                                                        } else {
                                                            setSelectedCategory("")
                                                        }
                                                    }}
                                                />
                                                {item.name}
                                            </div>

                                        )
                                    })
                                        : <CircularProgress />}

                                </div>

                                {/* 2nd item */}
                                <div className='top_instructors_filter'>
                                    <h1 className='top_instructos_title'>Top Instructors</h1>
                                    {
                                        Instructors_data.length > 0 && Array.isArray(Instructors_data) && Instructors_data.map((item, i) => {
                                            return (
                                                <div className='categoty_filter_item' key={i}>
                                                    <input
                                                        className='checkbox'
                                                        name='category'
                                                        type='checkbox'
                                                        id={`checkboxes-${i}`}
                                                        style={{ backgroundColor: "coral", color: "coral", cursor: "pointer" }}
                                                        value={item.name}
                                                        checked={selectedInstructor === item.name} // Set checked based on selectedCategory state
                                                        onChange={() => {
                                                            if (selectedInstructor !== item.name) {
                                                                setSelectedInstructor(item.name);
                                                            } else {
                                                                setSelectedInstructor("")
                                                            }
                                                        }}
                                                    />
                                                    {item.name}
                                                </div>
                                            )
                                        })
                                    }
                                </div>


                                {/* 4th item price filter */}
                                <div className='price_filter'>
                                    <h1 className='price_filter_title'>Price Filter</h1>
                                    <Slider
                                        aria-label="Price"
                                        defaultValue={2280}
                                        getAriaValueText={getrangeValue}
                                        valueLabelDisplay="auto"
                                        step={10}
                                        marks
                                        min={10}
                                        max={10000}
                                        color={"primary"}

                                    />
                                    <p style={{ fontSize: "19px" }}>Price: ₹{priceRange}</p>

                                </div>


                                {/* 5th item filter with rating */}
                                <div className='rating_filter'>
                                    <h1 className='rating_filter_title'>Ratings</h1>
                                    <div className='categoty_filter_item'>
                                        <input className='checkbox' type='checkbox' id='checkboxes' style={{ backgroundColor: "coral", color: "coral" }} name='rating' value={5} checked={rating == 5 ? true : false} onChange={(e) => setRating(e.target.value)} />
                                        🌟🌟🌟🌟🌟
                                    </div>

                                    <div className='categoty_filter_item'>
                                        <input className='checkbox' type='checkbox' id='checkboxes' style={{ backgroundColor: "coral", color: "coral" }} name='rating' value={4} checked={rating == 4} onChange={(e) => setRating(e.target.value)} />
                                        🌟🌟🌟🌟 ✰
                                    </div>

                                    <div className='categoty_filter_item'>
                                        <input className='checkbox' type='checkbox' id='checkboxes' style={{ backgroundColor: "coral", color: "coral" }} name='rating' value={3} checked={rating == 3} onChange={(e) => setRating(e.target.value)} />
                                        🌟🌟🌟 ✰ ✰
                                    </div>

                                    <div className='categoty_filter_item'>
                                        <input className='checkbox' type='checkbox' id='checkboxes' style={{ backgroundColor: "coral", color: "coral" }} name='rating' value={2} checked={rating == 2} onChange={(e) => setRating(e.target.value)} />
                                        🌟🌟 ✰ ✰ ✰
                                    </div>


                                    <div className='categoty_filter_item'>
                                        <input className='checkbox' type='checkbox' id='checkboxes' style={{ backgroundColor: "coral", color: "coral" }} name='rating' value={1} checked={rating == 1} onChange={(e) => setRating(e.target.value)} />
                                        🌟 ✰ ✰  ✰  ✰
                                    </div>
                                </div>

                            </div>


                        }
                    </section>


                    {/* right section */}
                    <section className='course_list_main_right'>
                        <div className='course_list_main_right_top'>
                            <span className='course_list_main_right_top_filtered_results'>Showing {showing_courses_no} Courses of {total_courses_no}</span>
                            <div className='right_top_filters'>
                                <div className='sort_by' id='sort_by'>
                                    <span className='sort_title'>Sort by:</span>
                                    <select className='sort_by_select_input'>
                                        <option className='sort_by_select_input_option' value={"popularity"}>popularity</option>
                                        <option className='sort_by_select_input_option' value={"Rating"}>Rating</option>
                                    </select>
                                </div>
                                <span className='view_type_one' onClick={() => SetAlignline(false)} style={{ border: !alignline ? "1px solid coral" : "" }}>
                                    <AppsIcon fontSize='medium' />
                                </span>
                                <span className='view_type_two' onClick={() => SetAlignline(true)} style={{ border: alignline ? "1px solid coral" : "" }}>
                                    <ListIcon fontSize='medium' />
                                </span>
                                {
                                    Screen_small ? (
                                        <>
                                            <span className='filters_for_sm_screen' onClick={() => Set_filtering_for_sm((p) => !p)} style={{ border: filtering_for_sm ? "1px solid coral" : "" }}>
                                                <FilterAltIcon fontSize='medium' />
                                            </span>

                                        </>
                                    ) : ""
                                }



                            </div>

                        </div>
                        <div className="course_list_main_right_bottom">
                            {
                                !alignline ? (
                                    <>

                                        {Data.length > 0 ? (
                                            <>
                                                {
                                                    Data.map((item, i) => {
                                                        return <Coursecard w={true} b={true} admin={false} id={item._id} course_duration={item.course_duration} course_name={item.course_name} course_lectures={item.course_lectures} course_thumnail={item.course_thumbnail} skill_level={item.skill_level} course_price={item.course_price} key={i} />
                                                    })
                                                }
                                            </>
                                        ) : !zero_res ? <CircularProgress /> : <h1>No courses found</h1>}

                                    </>
                                ) : (
                                    <>
                                        {Data.length > 0 ? (
                                            <>
                                                {
                                                    Data.map((item, i) => {
                                                        return <Course_card_line_align item={item} key={i} />
                                                    })
                                                }
                                            </>
                                        ) : !zero_res ? <CircularProgress /> : <h1>No courses found</h1>}
                                    </>
                                )}
                        </div>

                    </section>

                </section>

            </div>
            <Contactpage />


        </div>
    )
}

export default Course_list;