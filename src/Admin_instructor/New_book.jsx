import React from 'react'
import "./new_book.css";
import TagsInput from 'react-tagsinput';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
function New_book() {
    const [tags, setTags] = useState([]);
    const [BookName, setBookname] = useState("");
    const [Booksubtitle, setBooksubtitle] = useState("");
    const [BookDesc, setBookdesc] = useState("");
    const [BookAdditional_info, setBookAdditional_info] = useState("");
    const [actual_price, setactual_price] = useState("");
    const [final_price, setFinal_price] = useState("");
    const [stock, setStock] = useState("");
    const [images, setImages] = useState([]);
    const [Author, setAuthor] = useState("");

    const [loading, setLoading] = useState(false);


    const handleTags = (tags) => {
        if (tags.trim !== "") {
            setTags(tags);
        }
    }


    const handle_create = async () => {
        if (
            tags.length === 0 ||
            !BookName ||
            !Author ||
            !Booksubtitle ||
            !BookDesc ||
            !BookAdditional_info ||
            !actual_price ||
            !final_price ||
            !stock ||
            images.length === 0
        ) {
            toast.error("fill all required fileds");

        }
        else {
            setLoading(true);
            let data = new FormData();
            for (let i = 0; i < images.length; i++) {
                data.append('book_pics', images[i]);
            }
            data.append("title", BookName);
            data.append("description", BookDesc);
            data.append("Additional_info", BookAdditional_info);
            data.append("book_price", actual_price);
            data.append("book_actual_price", final_price);
            data.append("book_sub_title", Booksubtitle);
            data.append("In_stock", stock);
            data.append("tags", tags);
            data.append("Author", Author);


            await fetch(`https://edudev-server-1.onrender.com/addnew_book?token=${localStorage.getItem("instructor-token")}`, {
                method: "POST",
                body: data,
            }).then((succ) => {
                console.log(succ);
                if (succ.status === 200) {
                    setLoading(false);
                    toast.success("Book is created");
                    setBookname("");
                    setBookAdditional_info("");
                    setBookdesc("");
                    setFinal_price("");
                    setBooksubtitle("");
                    setImages("");
                    setStock("");
                    setTags([]);
                    setactual_price("");
                    setAuthor("");
                }
                else if (succ.status === 500) {
                    setLoading(false);
                    toast.error("Internal Error");
                }
            }).catch(err => {
                console.log(err);
                setLoading(false);
                toast.error("Intenal server error");
            })


        }
    }
    return (
        <div className='new_book'>
            <h2>Add New Book</h2>
            <Toaster />
            <form>
                {/* Book Details Section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    <div>
                        <label>Book Name:</label>
                        <input type='text' maxLength={60} placeholder='E.g. Autobiography of a Yogi' value={BookName} onChange={(e) => setBookname(e.target.value)} required />
                    </div>
                    <div>
                        <label>Author Name:</label>
                        <input type='text' maxLength={20} placeholder='E.g. Paramahansa Yogananda' value={Author} onChange={(e) => setAuthor(e.target.value)} required />
                    </div>
                </div>

                <label>Book Subtitle:</label>
                <input type='text' maxLength={60} placeholder='E.g. The life story...' value={Booksubtitle} onChange={(e) => setBooksubtitle(e.target.value)} required />

                <label>Book Description</label>
                <textarea required placeholder='Detailed description of the book...' value={BookDesc} onChange={(e) => setBookdesc(e.target.value)}></textarea>

                <label>Additional Information:</label>
                <textarea required placeholder='Any other relevant details...' value={BookAdditional_info} onChange={(e) => setBookAdditional_info(e.target.value)}></textarea>

                {/* Pricing & Stock Section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div>
                        <label>Actual Price (₹):</label>
                        <input type='number' placeholder='120' value={actual_price} onChange={(e) => setactual_price(e.target.value)} min={20} required />
                    </div>
                    <div>
                        <label>Discounted Price (₹):</label>
                        <input type='number' placeholder='110' value={final_price} onChange={(e) => setFinal_price(e.target.value)} min={20} required />
                    </div>
                    <div>
                        <label>Stock Quantity:</label>
                        <input type='number' placeholder='120' value={stock} onChange={(e) => setStock(e.target.value)} min={0} required />
                    </div>
                </div>

                <label>Add Tags for Book</label>
                <TagsInput value={tags} onChange={handleTags} />

                <label>Book Images</label>
                <input type='file' multiple accept='image/*' onChange={(e) => setImages([...e.target.files])} />

                <div className='selected_img_preview'>
                    {images && images.map((item, index) => {
                        let url = URL.createObjectURL(item);
                        return <img key={index} src={url} alt='book_preview' />
                    })}
                </div>

                <button className='create-a-book' type='button' id='button' onClick={handle_create} disabled={loading}>
                    {loading ? <CircularProgress size={24} color='inherit' /> : "Create Product"}
                </button>

            </form>
        </div>
    )
}

export default New_book;