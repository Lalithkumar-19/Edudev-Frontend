import * as React from 'react';
import Modal from '@mui/material/Modal';
import EditBook_modal from './EditBook_modal';


export default function Product_EditModal({Product_id}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log("product id is",Product_id)

    return (
        <div className='modal'>
            <button style={{background:"blue",border:"none",color:"white",cursor:"pointer"}} onClick={handleOpen}>Edit</button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                id='modal_main_div'
            >
                <div id='modal_inner_main'>
                    <h1 style={{ textAlign: "center" }}>Edit Product</h1>
                    <EditBook_modal />
                </div>
            </Modal>
        </div>
    );
}
