import * as React from 'react';
import Modal from '@mui/material/Modal';
import User from '../AdminPanelPages/User';
import { Visibility } from '@mui/icons-material';


export default function UserEdit_Modal({ User_id, view ,data,setdata}) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div className='modal'>
            {view ? (
                <>
                    <button className="widgetSmButton" onClick={handleOpen}>
                        <Visibility className="widgetSmIcon" />
                        Display
                    </button>
                </>) :
                <button style={{ background: "blue", border: "none", color: "white", cursor: "pointer" }} onClick={handleOpen}>Edit</button>

            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                id='modal_main_div'
            >
                <div id='modal_inner_main'>
                    <h1 style={{ textAlign: "center" }}>{view?"User Details":"User Update"}</h1>
                    <User view={view} id={User_id} rows={data} setrows={setdata} />
                </div>
            </Modal>
        </div>
    );
}
