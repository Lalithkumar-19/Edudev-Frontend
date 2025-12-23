import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Coursecard from '../Pages/Coursecard';
import Navbar from '../Pages/Navbar';
import Contactpage from '../Pages/FooterPage';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import "../Styles/WishlistPage.css";

function WishlistPage() {
    const courses = useSelector(state => state.wishList);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Ensure courses is an array to avoid crashes
    const safeCourses = Array.isArray(courses) ? courses : [];

    // Filter Logic
    const filteredCourses = safeCourses.filter(item =>
        item && (
            item.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.skill_level.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='wishlist_page'>
            <Navbar />

            <header className='wishlist_header'>
                <h1 className='wishlist_header_title'>
                    Your Wishlist
                </h1>
                <span className='wishlist_header_sub_title'>
                    Home / <span className='wishlist_header_sub_sub_title'>Wishlist</span>
                </span>

                {safeCourses.length > 0 && (
                    <div className='wishlist_search_bar_container'>
                        <input
                            type="text"
                            className="wishlist_search_input"
                            placeholder="Search your wishlist..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <SearchIcon className="wishlist_search_icon" />
                    </div>
                )}
            </header>

            <div className='wishlist_main'>
                {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                        <Coursecard
                            key={index}
                            course_thumnail={item.course_thumbnail}
                            course_duration={item.course_duration}
                            course_name={item.course_name}
                            course_price={item.course_price}
                            id={item._id}
                            skill_level={item.skill_level}
                            course_lectures={item.course_lectures}
                            wished_list={true}
                            creator={item.creator}
                        />
                    ))
                ) : (
                    safeCourses.length > 0 ? (
                        <div className='no_results'>
                            <p>No courses found matching "{searchQuery}"</p>
                        </div>
                    ) : (
                        <div className='empty_wishlist'>
                            <h2>Your wishlist is empty</h2>
                            <p>Explore our courses and save your favorites for later!</p>
                            <Link to="/courses" className='browse_courses_btn'>
                                Browse Courses
                            </Link>
                        </div>
                    )
                )}
            </div>

            {/* Pagination Controls */}
            {filteredCourses.length > itemsPerPage && (
                <div className='pagination_container'>
                    <button
                        className={`pagination_btn ${currentPage === 1 ? 'disabled' : ''}`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`pagination_page_number ${currentPage === i + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        className={`pagination_btn ${currentPage === totalPages ? 'disabled' : ''}`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}

            <Contactpage />
        </div>
    )
}

export default WishlistPage;
