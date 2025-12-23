import React, { useEffect, useState } from 'react'
import "../Styles/blogs_showing.css";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { format } from 'date-fns';

function Blogsshowingpage({ headingshow }) {
    useEffect(() => {
        Aos.init();
    }, [])
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        async function Fetch_posts() {
            // Fetch ALL blogs to handle client-side filtering and pagination effectively
            await axios.get("https://edudev-server-1.onrender.com/blogs").then((result) => {
                setPosts(result.data);
            }).catch(err => console.log(err));
        };
        Fetch_posts();
    }, []);

    // 1. Filter posts based on Search
    const filteredPosts = posts.filter(post =>
        post.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Paginate the Filtered Result
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll to top of posts section for better UX
        const section = document.querySelector('.blogs_showing_section');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='blogspage' style={{ marginTop: headingshow ? "140px" : "0px" }} data-aos="fade-down">
            <div className='categories_explore'>
                {headingshow ? (<h3 className='category_heading' >#Blogs</h3>) : ""}
                <div className='category_title_box' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                    <h1 className='categoty_title' style={{ alignSelf: "center" }}>Latest News & <span style={{ color: "tomato" }}>Articles</span></h1>
                    <span className='category_sub_quote' style={{ display: headingshow ? "flex" : "none", width: "90%", justifyContent: "center", margin: '0 auto' }}>
                        Stay informed with our curated selection of news and articles covering the cutting-edge developments in technology.
                    </span>

                    {/* Search Bar for Blogs */}
                    <div className='blog_search_bar_container'>
                        <input
                            type="text"
                            className="blog_search_input"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1); // Reset to page 1 on search
                            }}
                        />
                        <SearchIcon className="blog_search_icon" />
                    </div>
                </div>
            </div>

            {/* mainpagecode */}

            <div className='blogs_showing_section'>
                {
                    currentPosts.length > 0 ? currentPosts.map((item, index) => {
                        return (
                            <div className='blog_banner_div' key={index} data-aos="fade-up">
                                <div className='backdrop_div'>
                                    <span className='uploaded_date'>
                                        {format(new Date(item.posted_Date), "dd eeee yyyy")}
                                    </span>
                                    <img className="backdrop_pic" src={item.backdrop} alt="blogs_banner" />
                                </div>
                                <div className='About_blog'>
                                    <p className='About_blog_heading'>{item.name}</p>
                                    <div className='About_blog_text'>
                                        <div style={{ textAlign: "left" }} dangerouslySetInnerHTML={{ __html: item.content }} />
                                    </div>
                                    <div className='read_full_post'>
                                        <div className='click_button'>
                                            <span className='click_button_text' onClick={() => navigate("/selectedblog/" + item._id)} style={{ textAlign: "center" }}>Read Post </span><span ><TrendingUpIcon /></span></div>

                                    </div>
                                </div>
                            </div>
                        )
                    }) : (
                        posts.length > 0 && searchQuery && (
                            <div className="no_results" style={{ width: "100%", gridColumn: "1 / -1", display: 'flex', justifyContent: 'center' }}>
                                <p style={{ color: 'coral', margin: 'auto' }}>No articles found matching "{searchQuery}"</p>
                            </div>
                        )
                    )
                }
                {
                    posts.length === 0 ? <CircularProgress /> : ""
                }
            </div>

            {/* Pagination Controls */}
            {filteredPosts.length > postsPerPage && (
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

        </div>
    )
}

export default Blogsshowingpage;
