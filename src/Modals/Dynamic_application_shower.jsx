import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./Modal.css";
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState } from 'react';


export default function Dynamic_application_shower() {
    const params = useParams();
    const [open, setOpen] = React.useState(true);



    const [formData, setFormData] = useState({
        instructor_name: '',
        about_instructor: '',
        instructor_pic: '',
        gender: 'Male',
        address: '',
        email: '',
        password: '',
        phonenumber: null,
        website: '',
        college_name: "",
        year_of_passing: null,
        board_of_university: "",
        college_address: "",
        social_media: {
            facebook: '',
            twitter: '',
            Linkedin: '',
        },
        skills: [],
        years_of_experience: null,
    });

    useEffect(() => {
        const fetchdetails = async () => {
            await fetch(`https://edudev-server-1.onrender.com/get_single_instructor_application?id=${params.id}`, {
                method: "GET"
            })
                .then((res) => res.json())
                .then((data) => {
                    setFormData(data);
                })
        }
        fetchdetails();
    }, [])
    return (
        <div className='modal'>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                id='modal_main_div'
            >
                <div id='modal_inner_main' className="premiumModalContent">
                    <div className="modalHeader">
                        <Typography id="modal-modal-title" variant="h5" component="h2" className="modalTitle">
                            Instructor Application Details
                        </Typography>
                    </div>

                    <div className="modalBody scroller">
                        {/* Personal Details Section */}
                        <div className="modalSection">
                            <h3 className="sectionTitle">Personal Information</h3>
                            <div className="modalGrid">
                                <div className="formGroup">
                                    <label>Full Name</label>
                                    <input value={formData.instructor_name} readOnly disabled />
                                </div>
                                <div className="formGroup">
                                    <label>Email</label>
                                    <input value={formData.email} readOnly disabled />
                                </div>
                                <div className="formGroup">
                                    <label>Phone Number</label>
                                    <input value={formData.phonenumber} readOnly disabled />
                                </div>
                                <div className="formGroup">
                                    <label>Gender</label>
                                    <input value={formData.gender} readOnly disabled />
                                </div>
                                <div className="formGroup fullWidth">
                                    <label>Address</label>
                                    <input value={formData.address} readOnly disabled />
                                </div>
                                <div className="formGroup fullWidth">
                                    <label>About</label>
                                    <textarea value={formData.about_instructor} readOnly disabled rows={3} />
                                </div>
                            </div>
                        </div>

                        {/* Professional Details */}
                        <div className="modalSection">
                            <h3 className="sectionTitle">Professional Details</h3>
                            <div className="modalGrid">
                                <div className="formGroup">
                                    <label>Years of Experience</label>
                                    <input value={formData.years_of_experience} readOnly disabled />
                                </div>
                                <div className="formGroup">
                                    <label>Website</label>
                                    <input value={formData.website} readOnly disabled />
                                </div>
                            </div>
                        </div>

                        {/* Education */}
                        <div className="modalSection">
                            <h3 className="sectionTitle">Education</h3>
                            <div className="modalGrid">
                                <div className="formGroup">
                                    <label>College/University</label>
                                    <input value={formData.college_name} readOnly disabled />
                                </div>
                                <div className="formGroup">
                                    <label>University Board</label>
                                    <input value={formData.board_of_university} readOnly disabled />
                                </div>
                                <div className="formGroup">
                                    <label>Year of Passing</label>
                                    <input value={formData.year_of_passing} readOnly disabled />
                                </div>
                                <div className="formGroup fullWidth">
                                    <label>College Address</label>
                                    <textarea value={formData.college_address} readOnly disabled rows={2} />
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="modalSection">
                            <h3 className="sectionTitle">Social Media</h3>
                            <div className="modalGrid">
                                <div className="formGroup">
                                    <label>Facebook</label>
                                    <input value={formData.social_media.facebook} readOnly disabled />
                                </div>
                                <div className="formGroup">
                                    <label>LinkedIn</label>
                                    <input value={formData.social_media.Linkedin} readOnly disabled />
                                </div>
                                <div className="formGroup">
                                    <label>Twitter (X)</label>
                                    <input value={formData.social_media.twitter} readOnly disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
