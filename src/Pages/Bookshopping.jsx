import React from 'react'
import "../Styles/Bookshopping.css";
import Contactpage from './FooterPage';
import book from "../assets/book.jpg";
import Book2 from "../assets/Book2.jpg";
import Navbar from './Navbar';
import Bookcard from '../Multiuse_Pages/Bookcard';
import Customer_review from '../Multiuse_Pages/Customer_review';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';


function Bookshopping() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function Fetch_Books() {
            const books = await axios.get("https://edudev-server-1.onrender.com/Get_all_books",);
            if (books.status === 200) {
                setBooks(books.data);
            }
        }
        Fetch_Books();
    }, []);
    console.log(books);
    return (
        <div className='bookshopping'>
            <Navbar />
            <header className='book_shopping_title'>
                <h1 className='title'>Book Shop</h1>
                <span className='sub_title'>
                    Home/<span style={{ color: "coral" }} className='sub_sub_title'>
                        Book Shop
                    </span>
                </span>
            </header>

            <section className='best_seller_books'>
                <h1 className='best_seller_books_title'>Best Seller Books</h1>
                <div className='best_seller_books_section'>
                    {
                        books.length > 0 ? books.map((item, i) => {
                            return <Bookcard backdrop={item.book_pics[0]} id={item._id} name={item.title} aboutbook={item.description} acualcost={item.book_price} discountcost={item.book_actual_price} admin={false} key={i} />
                        }) : <CircularProgress color='primary'/>
                    }

                </div>
            </section>

            <section className='best_seller_books_of_the_month'>
                <div className='books_pic_main_div'>
                    <img src={book} alt="bestbooks_pic" width={"100%"} height={"100%"} style={{ objectFit: "cover" }} />
                </div>
                <div className='best_seller_books_right'>
                    <span className='heading'>
                        Best Selling Book <br /> Of The month
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
            {/* completed */}

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
                    <img src={Book2} alt='Ebooks' width={"50%"} height={"100%"} style={{ objectFit: "cover", margin: "0 auto", borderRadius: "20px" }} />
                </div>
            </section>


            <section className='new_releases'>
                <h1 className='new_releases_title'>New Releases</h1>
                <div className='new_releases_books'>
                    {books.length > 0 ? books.map((item, i) => {
                        return <Bookcard backdrop={item.book_pics[0]} id={item._id} name={item.title} aboutbook={item.description} acualcost={item.book_price} discountcost={item.book_actual_price} admin={false} key={i} />
                    }) : "loading...."}
                </div>
            </section>

            <section className='our_customers'>
                <h1 className='our_customers_title'>
                    Our Customers
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
                        We Provide You The
                        Experience
                    </span>
                    <p className='heading_desc' style={{lineHeight:"22px"}}>
                    Explore our collection of handpicked courses designed to inspire and educate. From foundational skills to advanced topics, our courses are crafted by industry experts to deliver meaningful learning experiences
                    </p>
                    <button className='see_our_products'>
                        See our products above→
                    </button>



                </div>
                <div className='see_all_products_footer_right'>

                    <img src={book} alt="bestbooks_pic" width={"100%"} height={"100%"} style={{ objectFit: "cover" }} />

                </div>
            </footer>


            <Contactpage />
        </div >
    )
}

export default Bookshopping