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
    const[Author,setAuthor]=useState("");
  
    const[loading,setLoading]=useState(false);


    const handleTags = (tags) => {
        if (tags.trim !== "") {
            setTags(tags);
        }
    }


    const handle_create = async () => {
        if (
            tags.length === 0 ||
            !BookName ||
            !Author||
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
            data.append("Author",Author);


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
            {/* <EditBook_modal /> */}
            <h2>Add New Book</h2>
            <Toaster />
            <form>
                <label>Book Name:</label>
                <input type='text' maxLength={60} width={"100%"} placeholder='Auto biography of a yogi' value={BookName} onChange={(e) => setBookname(e.target.value)} required />
                <label>Author Name:</label>
                <input type='text' maxLength={20} width={"100%"} placeholder='yogananda' value={Author} onChange={(e) => setAuthor(e.target.value)} required />
                <label>Book SubTitle:</label>
                <input type='text' maxLength={60} width={"100%"} placeholder='the yogic life story..' value={Booksubtitle} onChange={(e) => setBooksubtitle(e.target.value)} required />
                <label>Book Description</label>
                <textarea required placeholder='The life story of paramahamsa yogananda ...' value={BookDesc} onChange={(e) => setBookdesc(e.target.value)}></textarea>
                <label>Additional Information:</label>
                <textarea required placeholder='It reflects to every human being ,it says the real meaning of life .....' value={BookAdditional_info} onChange={(e) => setBookAdditional_info(e.target.value)}></textarea>
                <label>Actual price:</label>
                <input type='number' width={"100%"} placeholder='eg.$120' value={actual_price} onChange={(e) => setactual_price(e.target.value)} min={20} required />
                <label>final price:</label>
                <input type='number' width={"100%"} placeholder='eg.$110' value={final_price} onChange={(e) => setFinal_price(e.target.value)} min={20} required />
                <label>Number of Items in Stock</label>
                <input type='number' placeholder='eg. 120' value={stock} onChange={(e) => setStock(e.target.value)} min={0} required />
                <label>Add Tags for Book</label>
                <TagsInput value={tags} onChange={handleTags} />
                <label>Images of Book </label>
                <input type='file' multiple accept='image/*' onChange={(e) => setImages([...e.target.files])} />
                {
                    <div className='selected_img_preview'>
                        {images ? (
                            <>
                                {images.map((item, index) => {
                                    let url = URL.createObjectURL(item);

                                    return <img key={index} src={url} alt='book_images' width={200} height={200} />
                                })}
                            </>
                        ) : ""}
                    </div>
                }


                <button className='create-a-book' type='button' id='button' onClick={handle_create} disabled={loading}>{!loading?"Create Product":<CircularProgress color='primary'/>}</button>

            </form>

        </div>
    )
}

export default New_book;