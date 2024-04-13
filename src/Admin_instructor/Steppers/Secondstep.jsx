import React from 'react';
import './secondstep.css';
import { useState, useEffect } from 'react';
import { Player } from 'react-tuby';
import 'react-tuby/css/main.css';
import Course_videos from '../../Multiuse_Pages/Course_videos';
import { useCourseContext } from '../ContextApi/Course_context';
import { Toaster, toast } from 'react-hot-toast';



function Secondstep() {
    const [uploadingStatus, setUploadingStatus] = useState(false);
    const { state, dispatch } = useCourseContext();
    console.log(state, "state")
    const [course_video, setCourse_video] = useState({
        title: '',
        videos: [],
    });

    const handle_course_video = (ev) => {
        setCourse_video((prev) => ({
            ...prev, // Preserve the existing properties
            title: ev.target.value, // Update the title property
        }));
    };

    const handleVideoFile = (ev) => {
        const selectedFiles = Array.from(ev.target.files); // Convert the FileList to an array

        setCourse_video((prev) => ({
            ...prev, // Preserve the existing properties
            videos: [...prev.videos, ...selectedFiles], // Append the selected files to the videos array
        }));
    };




    const handlesubmit_Section = async () => {
        if (localStorage.getItem("course_id") && course_video.title && course_video.videos.length !== 0) {
            let formData = new FormData();
            formData.append("title", course_video.title);
            for (let i = 0; i < course_video.videos.length; i++) {
                let file = course_video.videos[i];
                formData.append('file', file);
            }
            let loading = toast.loading("uploading the content");
            setUploadingStatus(true);

            await fetch(`https://edudev-server-1.onrender.com/coursecontent?id=${localStorage.getItem("course_id")}&token=${localStorage.getItem("instructor-token")}`, {
                method: 'POST',
                body: formData
            }).then(() => {
                console.log('Success:', result);
                toast.remove(loading);
                setUploadingStatus(false);
                toast.success("Content uploaded successfully");
                setCourse_video({ title: "", videos: [] });
            }).catch(error)
            {
                console.error('Error:', error);
                toast.remove(loading);
                toast.error("Content uploading failed");
                setUploadingStatus(false);
            }
            setUploadingStatus(false);


        }
        else {
            toast.error("please fill all fields required...");
            toast.error("Something went wrong in uploading ...");
        }
    }

    console.log('main course videos ', course_video);




    return (
        <div className="second_step">
            <h2> Add Course Videos</h2>
            <Toaster />
            <div className="second_step_inner">
                <label>Section Title</label>
                <input
                    type="text"
                    maxLength={80}
                    placeholder="Title"
                    value={course_video.title}
                    onChange={handle_course_video}
                    required

                />
                <br />


                <div className="videos_input_div" >
                    <label>Videos for this section</label>
                    <input
                        type="file"
                        accept="video/*"
                        id="input-file-videos"
                        onChange={handleVideoFile}
                        required
                        disabled={course_video.title !== '' ? false : true}
                        style={{ cursor: course_video.title !== '' ? 'default' : 'not-allowed' }}
                    />
                    <span style={{ color: 'red' }}>Upload videos corresponding to this title in sequence</span>
                    <span style={{ color: 'red' }}>You can add some videos under this title before saving this section</span>
                    <button className="save_button" id="button" type="button" disabled={uploadingStatus} onClick={handlesubmit_Section}>
                        Save
                    </button>
                </div>
            </div>

            <div className="course_preview">


                {!!course_video.videos ? (
                    <>

                        {course_video.title ? <p className="title">
                            <h2>Section  Preview :</h2>
                            {course_video.title}</p> : ''}

                        {course_video.videos.map((item, index) => {
                            if (item !== (undefined || null)) {
                                const url = URL.createObjectURL(item);
                                return (
                                    <div key={index}>
                                        <p>{item.name}</p>
                                        <Player src={url} dimensions={{ width: '70%', height: '300px' }} />
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </>
                ) : (
                    ''
                )}
            </div>
            <h2 className='saved_sections'>Saved Sections</h2>


            {
                state.curriculm
                    ? state.curriculm.map((item, i) => (
                        <>
                            <div key={i}>
                                <p key={i} style={{ fontSize: "19px", color: "chocolate", fontWeight: "800", width: "100%", textAlign: "start", marginBottom: "0px" }}>
                                    {item.title}
                                </p>
                            </div>

                            {
                                item.curriculum_content.map((it, j) => (
                                    <Course_videos key={j} title={""} desc={it.name} admin={true} />
                                ))}
                        </>
                    ))
                    : ""
            }




        </div>
    );
}

export default Secondstep;
