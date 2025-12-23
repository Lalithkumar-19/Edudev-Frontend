import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Contactpage from './FooterPage';
import Coursecard from './Coursecard';
import axios from 'axios';
import "../Styles/featured_courses.css"; // Reuse card styles
import "../Styles/CoursesPage.css"; // New page styles
import { CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchCourses() {
            try {
                const res = await axios.get("https://edudev-server-1.onrender.com/get_all_courses");
                setCourses(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setLoading(false);
            }
        }
        fetchCourses();
    }, []);

    // Filter logic
    const filteredCourses = courses.filter(course =>
        course.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.skill_level.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='courses_page_container'>
            <Navbar />

            <header className='courses_header'>
                <h1>Explore Premium Courses</h1>
                <p className='courses_header_subtitle'>
                    Unlock your potential with our expert-led courses. Search and find the perfect match for your career goals.
                </p>

                <div className='search_bar_container'>
                    <input
                        type="text"
                        className="search_input"
                        placeholder="Search for courses, skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <SearchIcon className="search_icon" />
                </div>
            </header>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
                    <CircularProgress sx={{ color: 'coral' }} />
                </div>
            ) : (
                filteredCourses.length > 0 ? (
                    <main className='all_courses_grid'>
                        {filteredCourses.map((item, index) => (
                            <Coursecard
                                key={index}
                                id={item._id}
                                course_thumnail={item.course_thumbnail}
                                course_duration={item.course_duration}
                                course_name={item.course_name}
                                course_price={item.course_price}
                                skill_level={item.skill_level}
                                course_lectures={item.course_lectures}
                                creator={item.creator}
                                review_length={Array.isArray(item.Reviews) ? item.Reviews.length : 0}
                            />
                        ))}
                    </main>
                ) : (
                    <div className="no_results">
                        <p>No courses found matching "{searchQuery}"</p>
                    </div>
                )
            )}

            <Contactpage />
        </div>
    );
}

export default CoursesPage;
