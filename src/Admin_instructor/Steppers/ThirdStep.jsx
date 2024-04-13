import React from 'react'
import "./thirdstep.css";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useCourseContext } from '../ContextApi/Course_context';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function ThirdStep() {

    const { state, dispatch } = useCourseContext();
    const [video, setVideo] = useState("");
    console.log(state, "state");
    const navigate = useNavigate();

    const handleChange = (field, value) => {
        dispatch({ type: 'UPDATE_FIELD', field, value });

    };

    // form data to send data to backend api point
    const handleSubmit = async () => {
        if (state.assignments.length > 10 && state.noticeboard.length > 10 && video != "") {

            const formData = new FormData();
            formData.append("noticeboard", state.noticeboard);
            formData.append("assignments", state.assignments);
            formData.append("file", video);
            const loading = toast.loading("Uploading the data...")

            try {
                await fetch(`https://edudev-server-1.onrender.com/Add-noticeboard?id=${localStorage.getItem("course_id")}`,
                    {
                        method: 'POST',
                        body: formData
                    },).then((res) => {
                        console.log(res);
                        if (res.status === 200) {
                            toast.remove(loading);
                            toast.success("Your course is now added (:");
                            localStorage.removeItem("course_id");
                            window.location.reload();
                        }
                        else {
                            toast.error("Somethin went wrong ! try to login again");
                            toast.remove(loading);

                        }
                    }).catch(err => {
                        console.log(err);
                        toast.remove(loading);
                        toast.error("There is an error occured !");
                    })


            } catch (error) {
                console.log("error occured during posting ", error)
            }
        }
        else {
            toast.error("please enter data in all fields");
        }
    }







    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', "image"],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];
    return (
        <div className='third_step' >
            <Toaster />
            <form >
                <label>Notice Board</label>
                <ReactQuill theme='snow' value={state.noticeboard} formats={formats} modules={modules} onChange={(e) => { handleChange("noticeboard", e) }} style={{ textAlign: "start", width: "100%" }} />
                <label>Assignments</label>
                <ReactQuill theme='snow' value={state.assignments} formats={formats} modules={modules} onChange={(e) => { handleChange("assignments", e) }} style={{ textAlign: "start", width: "100%" }} />
                <label>Upload A Intro Video</label>
                <input type='file' accept='video/*' onChange={(e) => setVideo(e.target.files[0])} />
            </form>
            <button className='create_course' id='button' onClick={handleSubmit} >Complete course</button>
        </div>
    )
}

export default ThirdStep;