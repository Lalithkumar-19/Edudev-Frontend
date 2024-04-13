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
                <div id='modal_inner_main'>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ borderRadius: "10px", fontSize: "20px", fontWeight: 800, color: "coral" }}>
                        personal details
                    </Typography>
                    <div id="modal-modal-description" sx={{ mt: 2 }}>
                        <label className='modal_label'>Full Name </label>
                        <input className='modal_input' placeholder='Full Name' value={formData.instructor_name} name='instructor_name' type='text' readOnly />
                        <label className='modal_label' >Phone number</label>
                        <input className='modal_input' value={formData.phonenumber} name='phonenumber' placeholder=' Number' maxLength={10} type='text' readOnly />
                        <label className='modal_label'>About Yourself</label>
                        <input className='modal_input' value={formData.about_instructor} name='about_instructor' placeholder='About instructor' type='text' readOnly />
                        <label className='modal_label'>Instructor Email</label>
                        <input className='modal_input' value={formData.email} name='email' placeholder='Instructor Email' type='text' readOnly />
                        <label className='modal_label'>Set a Password</label>
                        <input className='modal_input' value={formData.password} name='password' placeholder='Set a Password' type='text' readOnly />
                        <label className='modal_label'>Website Url</label>
                        <input className='modal_input' value={formData.website} name='website' placeholder='Website Url' type='text' readOnly />

                        <label className='modal_label'>Your Address</label>
                        <input className='modal_input' value={formData.address} name='address' placeholder=' Address' type='text' readOnly />
                        {/* <label className='modal_label'>Date of birth</label>
                        <input className='modal_input'   name='' placeholder='date of birth' type='date' /> */}
                        <label className='modal_label' >Years of Experience</label>
                        <input className='modal_input' value={formData.years_of_experience} name='years_of_experience' placeholder='year of experience' type='Number' readOnly />
                        <label className='modal_label' >Gender</label>
                        <div className='gender_inputs_div'>
                            <input className='modal_input_radio' placeholder=' Name' type='radio' name='gender' style={{ accentColor: "coral", border: "none", cursor: "pointer" }} /><span>Male</span>
                            <input className='modal_input_radio' placeholder=' Name' type='radio' name='gender' style={{ accentColor: "coral", border: "none", cursor: "pointer" }} /><span>Female</span>
                        </div>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ borderRadius: "10px", fontSize: "20px", fontWeight: 800, color: "coral" }}>
                            Education
                        </Typography>



                        <label className='modal_label'>College or university name</label>
                        <input className='modal_input' value={formData.college_name} name="college_name" placeholder=' Name' type='text' readOnly />
                        <label className='modal_label'>Year of passing</label>
                        <input className='modal_input' value={formData.year_of_passing} name='year_of_passing' placeholder=' passing yaer' type='number' readOnly />
                        <label className='modal_label'>Board of University</label>
                        <input className='modal_input' value={formData.board_of_university} name='board_of_university' placeholder=' University' type='text' readOnly />
                        <label className='modal_label' >College or University address</label>
                        <textarea id='modal_text_area' value={formData.college_address} name='college_address' placeholder=' Address' readOnly />

                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ borderRadius: "10px", fontSize: "20px", fontWeight: 800, color: "coral" }}>
                            Social Media
                        </Typography>
                        <label className='modal_label'>Facebook</label>
                        <input className='modal_input' value={formData.social_media.facebook} name="facebook" readOnly onChange={(e) => { setFormData({ ...formData, social_media: { ...formData.social_media, facebook: e.target.value } }) }} placeholder=' Name' type='text' />
                        <label className='modal_label'>Linkedin</label>
                        <input className='modal_input' value={formData.social_media.Linkedin} name="Linkdenin" readOnly onChange={(e) => { setFormData({ ...formData, social_media: { ...formData.social_media, Linkedin: e.target.value } }) }} placeholder=' Name' type='text' />
                        <label className='modal_label'>Twitter (X)</label>
                        <input className='modal_input' value={formData.social_media.twitter} name="twitter" readOnly onChange={(e) => { setFormData({ ...formData, social_media: { ...formData.social_media, twitter: e.target.value } }) }} placeholder=' Name' type='text' />
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ borderRadius: "10px", fontSize: "20px", fontWeight: 800, color: "coral" }}>
                            Profile picture
                        </Typography>
                        <label className='modal_label'>Upload Image</label>

                    </div>
                </div>
            </Modal>
        </div>
    );
}
