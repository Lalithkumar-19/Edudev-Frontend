import * as React from 'react';
import Modal from '@mui/material/Modal';
import "./Modal.css";
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';



export default function EditBook_modal({ id, }) {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [updatedBookData, setBookData] = useState({
        title: '',
        Author: "",
        description: '',
        Additional_info: '',
        book_price: '',
        book_actual_price: '',
        In_stock: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...updatedBookData,
            [name]: value,
        });
    };
    const handleUpdate = async () => {
        if (!updatedBookData.title || !updatedBookData.Author || !updatedBookData.description || !updatedBookData.book_actual_price || !updatedBookData.book_price || !updatedBookData.In_stock) {
            toast.error("Please fill all fields");
        }
        else {

            try {
                const res = await axios.post(`https://edudev-server-1.onrender.com/update_book?token=${localStorage.getItem("instructor-token")}&id=${id}`, updatedBookData);
                if (res.status === 200) {
                    toast.success("Updated successfully");
                    setOpen(false);
                    window.location.reload();
                }

            } catch (error) {
                toast.error("Error while updating");
            }


        }


    }
    useEffect(() => {
        async function Get_book_details() {
            const res = await axios.get(`https://edudev-server-1.onrender.com/Get_single_book?id=${id}&token=${localStorage.getItem("instructor-token")}`);
            if (res.status === 200) {
                setBookData({ ...res.data });
            }
        }
        Get_book_details();
    }, [])


    const handle_Delete_book=async ()=>{
        try {
            const res=await axios.put(`https://edudev-server-1.onrender.com/delete_book?id=${id}&token=${localStorage.getItem("instructor-token")}`);
            if(res.status===200){
                toast.success("deleted successfully");
                window.location.reload();
            }
            else{
                toast.error("internal server error occured")
            }
        } catch (error) {
            toast.error("check internet connection")
        }
    }


    return (
        <div className='modal'>
            <button id='button' style={{ width: "100%" }} onClick={() => setOpen(true)}> Edit Book</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                id='modal_main_div'
            >
                <div id='modal_inner_main' >
                    <h2>Update Book Data</h2>
                    <div id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField
                            name="title"
                            label="Book Name"
                            value={updatedBookData.title}
                            onChange={handleChange}
                        />
                        <TextField
                            name="Author"
                            label="Book Author"
                            value={updatedBookData.Author}
                            onChange={handleChange}
                        />
                        <TextField
                            name="description"
                            label="Book Description"
                            value={updatedBookData.description}
                            onChange={handleChange}
                        />
                        <TextField
                            name="Additional_info"
                            label="Additional Information"
                            value={updatedBookData.Additional_info}
                            onChange={handleChange}
                        />
                        <TextField
                            name="book_price"
                            label="Actual Price"
                            value={updatedBookData.book_price}
                            onChange={handleChange}
                        />
                        <TextField
                            name="book_actual_price"
                            label="Final Price"
                            value={updatedBookData.book_actual_price}
                            onChange={handleChange}
                        />
                        <TextField
                            name="In_stock"
                            label="Number of Items in Stock"
                            value={updatedBookData.In_stock}
                            onChange={handleChange}
                        />
                        {/* Add fields for tags and images as needed */}
                        <Button onClick={handleUpdate} variant="contained" color="primary" sx={{ marginBottom: "20px" }}>
                            Update
                        </Button>
                        <Button onClick={handle_Delete_book} variant="contained" color="primary" sx={{ marginBottom: "20px" }}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
