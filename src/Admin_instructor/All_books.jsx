import React, { useEffect, useState } from 'react'
import "./all_books.css";
import Bookcard from '../Multiuse_Pages/Bookcard';
import axios from 'axios';
function All_books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function fetch_books() {
            const res = await axios.get(`https://edudev-server-1.onrender.com/Get_instrutor_books?token=${localStorage.getItem("instructor-token")}`);
            if (res.status === 200) {
                setBooks(res.data);
            }
        }
        fetch_books();
    }, [])
    return (
        <div className='all_books'>

            <section className='main_books_admin_section'>
                <h2 className='books_page_title'>All Books </h2>
                <div className='books_div'>
                    {
                        books.length > 0 ? books.map((item, i) => {
                            return <Bookcard  backdrop={item.book_pics[0]} id={item._id} name={item.title} aboutbook={item.description} acualcost={item.book_price} discountcost={item.book_actual_price} admin={true} key={i} />
                        }) : <h2>No Books posted </h2>
                        
                    }
                </div>

            </section>
        </div>
    )
}

export default All_books;