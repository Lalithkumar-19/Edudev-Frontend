import React from 'react'
import TagsInput from 'react-tagsinput';
import { useState } from 'react';
import "../Admin_instructor/new_book.css";

function NewProduct() {
  const [tags, setTags] = useState([]);
  const [BookName, setBookname] = useState("");
  const [BookDesc, setBookdesc] = useState("");
  const [BookAdditional_info, setBookAdditional_info] = useState("");
  const [actual_price, setactual_price] = useState("");
  const [final_price, setFinal_price] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);



  const handleTags = (tags) => {
    setTags(tags);
  }
  
  return (
    <div className='new_book'>
      <h2>Add New Book</h2>
      <form>
        <label>Book Name:</label>
        <input type='text' maxLength={60} width={"100%"} placeholder='Auto biography of a yogi' value={BookName} onChange={(e) => setBookname(e.target.value)} required />
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


        <button className='create-a-book' type='button' id='button'>Create Product</button>

      </form>

    </div>
  )
}

export default NewProduct;