import React, { useEffect, useState } from 'react';
import "../Styles/Bookshopping.css";
import Contactpage from './FooterPage';
import book from "../assets/book.jpg";
import Book2 from "../assets/Book2.jpg";
import Navbar from './Navbar';
import Bookcard from '../Multiuse_Pages/Bookcard';
import Customer_review from '../Multiuse_Pages/Customer_review';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Bookshopping() {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Showing 8 books per page for better grid alignment
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function Fetch_Books() {
            try {
                const res = await axios.get("https://edudev-server-1.onrender.com/Get_all_books");
                if (res.status === 200) {
                    setBooks(res.data);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching books:", error);
                setLoading(false);
            }
        }
        Fetch_Books();
    }, []);

    // Filter Logic
    const filteredBooks = books.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        const section = document.querySelector('.best_seller_books_section');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };


    return (
        <div className='bookshopping'>
            <Navbar />

            <header className='book_shopping_title'>
                <h1 className='title'>Book Shop</h1>
                <span className='sub_title'>
                    Home/<span className='sub_sub_title'>Book Shop</span>
                </span>

                <div className='book_search_bar_container'>
                    <input
                        type="text"
                        className="book_search_input"
                        placeholder="Search books..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <SearchIcon className="book_search_icon" />
                </div>
            </header>

            <section className='best_seller_books'>
                <h1 className='best_seller_books_title'>{searchQuery ? "Search Results" : "Best Seller Books"}</h1>
                <div className='best_seller_books_section'>
                    {!loading ? (
                        currentItems.length > 0 ? (
                            currentItems.map((item, i) => (
                                <Bookcard
                                    key={i}
                                    backdrop={item.book_pics[0]}
                                    id={item._id}
                                    name={item.title}
                                    aboutbook={item.description}
                                    acualcost={item.book_price}
                                    discountcost={item.book_actual_price}
                                    admin={false}
                                />
                            ))
                        ) : (
                            <div className='no_results'>
                                <p>No books found matching "{searchQuery}"</p>
                            </div>
                        )
                    ) : (
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress sx={{ color: 'coral' }} />
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {filteredBooks.length > itemsPerPage && (
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
            </section>

            {/* ONLY SHOW EXTRAS IF NOT SEARCHING or user wants them always. 
                Let's keep them always but maybe search applies to "New Releases" too? 
                For now, search filters the "Best Seller" grid which seems to act as the main catalogue.
                We will keep the promo banners.
            */}

            <section className='best_seller_books_of_the_month'>
                <div className='books_pic_main_div'>
                    <img src={book} alt="bestbooks_pic" />
                </div>
                <div className='best_seller_books_right'>
                    <span className='heading'>
                        Best Selling Book <br /> Of The Month
                    </span>
                    <span className='book_star_rating'>
                        ⭐ ⭐ ⭐ ⭐ ⭐
                    </span>
                    <p className='book_desc'>
                        Our curated collection of top-rated books that are captivating readers worldwide. Discover compelling stories, insightful perspectives, and expert knowledge that have earned these books their best-seller status. Embark on a literary journey with our handpicked selection of must-reads.
                    </p>
                    <span className='book_rate'>
                        ₹ 50.00
                    </span>
                    <button className='buy_now_button'>
                        Buy Now
                    </button>
                </div>
            </section>

            <section className='all_e_products'>
                <div className="all_e_products_left">
                    <span className='all_e_products_left_head_title'>
                        Take A First Look In <br />
                        The E-Books Value
                    </span>
                    <p className='all_e_products_left_desc'>
                        Whether you're a seasoned professional or just starting out, these books offer valuable insights into design principles, typography, color theory, and digital tools. Learn from industry experts and discover practical techniques to enhance your creativity and craft impactful visual communications.
                    </p>
                    <button className='see_our_products_button'>
                        See our products below →
                    </button>
                </div>
                <div className='all_e_products_right' >
                    <img src={Book2} alt='Ebooks' style={{ borderRadius: "20px" }} />
                </div>
            </section>

            {/* If we want New Releases to also be filtered or just static, keeping static for now as "New Releases" 
                usually implies a curated list, but could filter too. 
                Given user request "do for this page also" (search/pagination), 
                I applied it to the main catalogue above. I'll maintain this section as is or hide if search is active?
                Let's keep it visible.
            */}
            <section className='new_releases'>
                <h1 className='new_releases_title'>New Releases</h1>
                <div className='new_releases_books'>
                    {/* For new releases, maybe simply show the first 4 recent books or random? 
                         Reusing fuzzy data for now as per original code which mapped 'books' again.
                         I'll slice it to showing just 4 to look neat.
                     */}
                    {books.length > 0 ? books.slice(0, 4).map((item, i) => {
                        return <Bookcard backdrop={item.book_pics[0]} id={item._id} name={item.title} aboutbook={item.description} acualcost={item.book_price} discountcost={item.book_actual_price} admin={false} key={i} />
                    }) : <CircularProgress sx={{ color: 'coral' }} />}
                </div>
            </section>

            <section className='our_customers'>
                <h1 className='our_customers_title'>
                    Our Customer Reviews
                </h1>

                <div className='our_customer_reviews'>
                    <Customer_review />
                    <Customer_review />
                    <Customer_review />
                </div>
            </section>

            <footer className='see_all_products_footer'>
                <div className='see_all_products_footer_left'>
                    <span className='heading'>
                        We Provide You The Experience
                    </span>
                    <p className='heading_desc'>
                        Explore our collection of handpicked courses designed to inspire and educate. From foundational skills to advanced topics, our courses are crafted by industry experts to deliver meaningful learning experiences
                    </p>
                    <button className='see_our_products'>
                        See our products above →
                    </button>
                </div>
                <div className='see_all_products_footer_right'>
                    <img src={book} alt="bestbooks_pic" />
                </div>
            </footer>

            <Contactpage />
        </div >
    )
}

export default Bookshopping