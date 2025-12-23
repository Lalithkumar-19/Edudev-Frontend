import React, { useEffect, useState } from 'react'
import "../Styles/All_Instructors.css";
import Team_member_card from './Team_member_card';
import Navbar from './Navbar';
import FooterPage from './FooterPage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function All_Instructors() {
    const [instructors, setInstructors] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [loading, setLoading] = useState(true);

    const Fetch_ins = async () => {
        try {
            // Fetch ALL instructors to handle client-side filtering and pagination
            const res = await axios.get("https://edudev-server-1.onrender.com/fetch_all_ins");
            if (res.status === 200) {
                setInstructors(res.data);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        Fetch_ins();
    }, [])

    // Filter Logic
    const filteredInstructors = instructors.filter(item =>
        item.instructor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.profession.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredInstructors.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredInstructors.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='all_instructors'>
            <Navbar />

            <header className='all_instructors_header'>
                <h1 className='all_instructors_title'>
                    Meet Our Instructors
                </h1>
                <span className='all_instructors_sub_title'>
                    Expert guidance from industry leaders
                </span>

                <div className='instructor_search_bar_container'>
                    <input
                        type="text"
                        className="instructor_search_input"
                        placeholder="Search instructors by name or role..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <SearchIcon className="instructor_search_icon" />
                </div>
            </header>

            <section className='all_instructors_main'>
                {!loading ? (
                    currentItems.length > 0 ? (
                        currentItems.map((item, i) => (
                            <Team_member_card
                                key={i}
                                id={item._id}
                                name={item.instructor_name}
                                role={item.profession}
                                socialmedia={item.social_media}
                                image={item.instructor_Image} // Assuming API returns this field, using placeholder fallback in component if null
                            />
                        ))
                    ) : (
                        <div className='no_results'>
                            <p>No instructors found matching "{searchQuery}"</p>
                        </div>
                    )
                ) : (
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress sx={{ color: 'coral' }} />
                    </div>
                )}
            </section>

            {/* Pagination Controls */}
            {filteredInstructors.length > itemsPerPage && (
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

            <FooterPage />
        </div>
    )
}

export default All_Instructors