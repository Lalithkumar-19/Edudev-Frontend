import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./Modal.css";
import { CancelRounded } from '@mui/icons-material';
import { useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';


export default function Instructor_Modal() {



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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(formData);
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // base64();

        try {
            const response = await axios.post('https://edudev-server-1.onrender.com/apply-instructor', formData);
            console.log('Instructor application submitted successfully:', response.data);
            toast.success("Application is submitted successfully, we will mail you within one day,you can login using your email and password as intructor to create courses",{duration:"100"});
            setOpen(false);
            // Optionally, you can handle success in your UI or redirect to a success page
        } catch (error) {
            console.error('Error submitting instructor application:', error);
            // Optionally, you can handle errors in your UI or display an error message
        }
    }


    return (
        <div className='modal'>
            <button id='button' onClick={handleOpen}>Apply Instructor</button>
            <Toaster />
            <Modal
                open={open} FFFF
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                id='modal_main_div'
            >
                <div id='modal_inner_main'>
                    <h1 style={{ textAlign: "center" }}>Apply Instructor</h1>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ borderRadius: "10px", fontSize: "20px", fontWeight: 800, color: "coral" }}>
                        personal details
                    </Typography>
                    <div id="modal-modal-description" sx={{ mt: 2 }}>
                        <label className='modal_label'>Full Name </label>
                        <input className='modal_input' placeholder='Full Name' value={formData.instructor_name} name='instructor_name' onChange={handleChange} type='text' />
                        <label className='modal_label' >Phone number</label>
                        <input className='modal_input' onChange={handleChange} value={formData.phonenumber} name='phonenumber' placeholder=' Number' maxLength={10} type='text' />
                        <label className='modal_label'>About Yourself</label>
                        <input className='modal_input' onChange={handleChange} value={formData.about_instructor} name='about_instructor' placeholder='About instructor' type='text' />
                        <label className='modal_label'>Instructor Email</label>
                        <input className='modal_input' onChange={handleChange} value={formData.email} name='email' placeholder='Instructor Email' type='text' />
                        <label className='modal_label'>Set a Password</label>
                        <input className='modal_input' onChange={handleChange} value={formData.password} name='password' placeholder='Set a Password' type='text' />
                        <label className='modal_label'>Website Url</label>
                        <input className='modal_input' onChange={handleChange} value={formData.website} name='website' placeholder='Website Url' type='text' />

                        <label className='modal_label'>Your Address</label>
                        <input className='modal_input' onChange={handleChange} value={formData.address} name='address' placeholder=' Address' type='text' />
                        {/* <label className='modal_label'>Date of birth</label>
                        <input className='modal_input' onChange={handleChange}  name='' placeholder='date of birth' type='date' /> */}
                        <label className='modal_label' >Years of Experience</label>
                        <input className='modal_input' onChange={handleChange} value={formData.years_of_experience} name='years_of_experience' placeholder='year of experience' type='Number' />
                        <label className='modal_label' >Gender</label>
                        <div className='gender_inputs_div'>
                            <input className='modal_input_radio' placeholder=' Name' type='radio' name='gender' style={{ accentColor: "coral", border: "none", cursor: "pointer" }} /><span>Male</span>
                            <input className='modal_input_radio' placeholder=' Name' type='radio' name='gender' style={{ accentColor: "coral", border: "none", cursor: "pointer" }} /><span>Female</span>
                        </div>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ borderRadius: "10px", fontSize: "20px", fontWeight: 800, color: "coral" }}>
                            Education
                        </Typography>



                        <label className='modal_label'>College or university name</label>
                        <input className='modal_input' value={formData.college_name} name="college_name" onChange={handleChange} placeholder=' Name' type='text' />
                        <label className='modal_label'>Year of passing</label>
                        <input className='modal_input' value={formData.year_of_passing} name='year_of_passing' onChange={handleChange} placeholder=' passing yaer' type='number' />
                        <label className='modal_label'>Board of University</label>
                        <input className='modal_input' value={formData.board_of_university} name='board_of_university' onChange={handleChange} placeholder=' University' type='text' />
                        <label className='modal_label' >College or University address</label>
                        <textarea id='modal_text_area' value={formData.college_address} name='college_address' onChange={handleChange} placeholder=' Address' />

                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ borderRadius: "10px", fontSize: "20px", fontWeight: 800, color: "coral" }}>
                            Social Media
                        </Typography>
                        <label className='modal_label'>Facebook</label>
                        <input className='modal_input' value={formData.social_media.facebook} name="facebook" onChange={(e) => { setFormData({ ...formData, social_media: { ...formData.social_media, facebook: e.target.value } }) }} placeholder=' Name' type='text' />
                        <label className='modal_label'>Linkedin</label>
                        <input className='modal_input' value={formData.social_media.Linkedin} name="Linkdenin" onChange={(e) => { setFormData({ ...formData, social_media: { ...formData.social_media, Linkedin: e.target.value } }) }} placeholder=' Name' type='text' />
                        <label className='modal_label'>Twitter (X)</label>
                        <input className='modal_input' value={formData.social_media.twitter} name="twitter" onChange={(e) => { setFormData({ ...formData, social_media: { ...formData.social_media, twitter: e.target.value } }) }} placeholder=' Name' type='text' />
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ borderRadius: "10px", fontSize: "20px", fontWeight: 800, color: "coral" }}>
                            Profile picture
                        </Typography>
                        <label className='modal_label'>Upload Image</label>
                        <input className='modal_input' onChange={(e) => { setFormData({ ...formData, instructor_pic: e.target.files[0] }) }} type='file' accept='image/*' />


                        <button id='button' className='modal_submit_button' onClick={handleSubmit}>Submit</button>
                        <span className='cancle_button' onClick={handleClose}><CancelRounded fontSize='large' /></span>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

