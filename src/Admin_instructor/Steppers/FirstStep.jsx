import React, { useState } from 'react'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import "./firststep.css";
import { useCourseContext } from '../ContextApi/Course_context';
import { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';

function FirstStep({ completed }) {

    const { state, dispatch } = useCourseContext();
    console.log(state, "state")

    const handleChange = (field, value) => {
        dispatch({ type: 'UPDATE_FIELD', field, value });
    };

    const [sending, setSending] = useState(false);
    const [saved, setSaved] = useState(false);
    const [thumbnail, setThumbanil] = useState("");
    const [inputText, setInputText] = useState('');
    const [Inputgain, setInputgain] = useState('');
    const [course_duration, setCourse_duration] = useState({
        length: "",
        field: "",
    });
    const [tags, setTags] = useState([]);

    useEffect(() => {
        async function fetchdata() {
            console.log("fetching data ....");
            if (localStorage.getItem('course_id')) {
                let courseId = localStorage.getItem("course_id");
                // course_id(courseId);
                await fetch(`https://edudev-server-1.onrender.com/get_course_details?id=${courseId}`).then((data) => {
                    if (data.status === 200) {
                        data.json().then(d => {
                            dispatch({ type: 'total_update', payload: d });
                            setSaved(true);
                            setTags([d.Tags]);

                        }).catch(err => console.log(err));
                    }

                }
                )
            }
        }
        fetchdata();
    }, []);



    //tags input libarray hooks

    const handletags = (tags) => {
        setTags(tags);
        dispatch({ type: 'ADD_TAGS', value: tags });
    }
    const handleRequirementChange = () => {
        if (inputText.trim() !== '') {
            dispatch({ type: 'ADD_REQUIREMENT', value: inputText });
            setInputText("");
        }

    };
    const handleCourseGains = () => {
        if (Inputgain.trim() !== '') {
            dispatch({ type: 'ADD_LEARNING_OBJ', value: Inputgain });
            setInputgain('');
        }
    }









    const upload_course_thumbnail = async () => {
        if (thumbnail) {
            let data = new FormData()
            data.append("file", thumbnail);
            const res = await axios.post("https://edudev-server-1.onrender.com/upload-course-thumbnail", data);
            if (res.status === 200) {
                toast.success("uploaded thubnail");
            }
        } else {
            toast.error("upload a thumbnail");
        }
    }



    const handleCreate_course = async () => {

        const isInitialStateFilled = () => {
            const excludedProperties = ['noticeboard', 'assignments', 'curriculm', 'course_intro_video', 'creator_objid'];

            for (const key in state) {
                if (!excludedProperties.includes(key)) {
                    if (typeof state[key] === 'object' && Object.keys(state[key]).length === 0) {
                        return false; // Object property is empty
                    } else if (state[key] === null || state[key] === "") {
                        return false; // Property is either null or an empty string
                    }
                }
            }
            if (thumbnail === null || thumbnail === undefined) {
                toast.error("Please upload a thumbnail");
                return false;
            }
            return true;
        };


        if (isInitialStateFilled()) {
            setSending(true);
            await fileToBase64(thumbnail).then(res => {
                setBase64_thumbnail(res);
            })
            const requestBody = JSON.stringify({ ...state });
            let loading = toast.loading("creating the course");
            // Send the data to the API using the fetch function
            const update_url = `https://edudev-server-1.onrender.com/update-course?id="${localStorage.getItem("course_id")}`;
            const posting_url = `https://edudev-server-1.onrender.com/create-course?token=${localStorage.getItem("instructor-token")}`;
            const response = await axios.post(saved ? update_url : posting_url, requestBody, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            upload_course_thumbnail();

            if (response.status === 200) {
                console.log('Server response:', response.data);
                toast.remove(loading);
                completed(true);
                localStorage.setItem("course_id", response.data && response.data.data);
                setSending(false);
                toast.success("uploaded successfully!!");
                localStorage.setItem("first_step", "yes");

            } else {
                console.error('Error sending data:', error);
                toast.remove(loading);
                setSending(false);
            }

        }
        else {
            toast.error("Please fill all fields");
            setSending(false);
        }




    }
    return (
        <div className='first_step'>
            <Toaster />
            <form className="first_step_form">
                <div className='form_item'>
                    <label htmlFor="courseTitle">Course Title:</label>
                    <input type="text" id="courseTitle" value={state.course_name}
                        onChange={(e) => handleChange('course_name', e.target.value)}
                        required name="courseTitle" />
                </div>

                <div className='form_item'>
                    <label htmlFor="courseDescription">Course Description:</label>
                    <textarea id="courseDescription" required maxLength={500} name="courseDescription" value={state.course_description}
                        onChange={(e) => handleChange('course_description', e.target.value)}
                    />
                </div>
                {/* 
// course requirements */}

                <div className='form_item'>
                    <textarea
                        maxLength={100}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter a Requirement"
                        required
                    />
                    <button type='button' id='button' onClick={handleRequirementChange}>Add Requirements</button>
                    <ul>
                        {state.requirements?.map((sentence, index) => (
                            <li key={index}>{sentence}</li>
                        ))}
                    </ul>
                </div>


                <div className='form_item'>
                    <textarea
                        value={Inputgain}
                        maxLength={100}
                        onChange={(e) => setInputgain(e.target.value)}
                        placeholder="Enter a Course Gain"
                        required
                    />
                    <button type='button' id='button' onClick={handleCourseGains}>Add Course Gain</button>
                    <ul>
                        {state.learning_objs?.map((sentence, index) => (
                            <li key={index}>{sentence}</li>
                        ))}
                    </ul>
                </div>


                <div className='form_item'>
                    <label>Category of Course</label>
                    <input placeholder='Enter the category of course'
                        required type='text'
                        value={state.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        maxLength={30} />
                </div>
                {/* //course duration? */}
                <div className='form_item'>
                    <label>Course Duration</label>
                    <div >
                        <input placeholder='Enter the course duration' required type='number' min={3} value={course_duration.length}
                            onChange={(e) => {
                                setCourse_duration({ field: "W", length: e.target.value })
                                handleChange("course_duration", course_duration)
                            }
                            }
                        />
                        <select required value={course_duration.field} onChange={(e) => {
                            setCourse_duration({ length: course_duration.length, field: e.target.value })
                            handleChange("course_duration", course_duration)
                        }}>
                            <option selected value={"W"} onChange={(e) => {
                                setCourse_duration({ length: course_duration.length, field: e.target.value })
                                handleChange("course_duration", course_duration)
                            }} >Weeks</option>
                            <option value={"Y"}>Years</option>

                        </select>
                    </div>
                </div>
                {/* course language */}

                <div className='form_item'>
                    <label>Select a Language</label>
                    <select placeholder='Select a Language' value={state.course_language} onChange={(e) => { handleChange("course_language", e.target.value) }} required>
                        <option disabled >Select Course Language</option>
                        <option value={"English"}>English</option>
                        <option value={"Telugu"}>Telugu</option>
                    </select>
                </div>


                <div className='form_item'>
                    <label>DO you offer Certificate</label>
                    <select placeholder='Certificate' value={state.certificate} onChange={(e) => { handleChange("certificate", e.target.value) }} required>
                        <option disabled ></option>
                        <option value={false}>No</option>
                        <option value={true} >Yes</option>

                    </select>
                </div>


                <div className='form_item'>
                    <label>Deadline for course</label>
                    <input placeholder='Deadline' type='date' value={state.Deadline} onChange={(e) => handleChange("Deadline", e.target.value)} required />
                </div>

                <div className='form_item'>
                    <label>Price of course</label>
                    <input placeholder='Enter the price of course' type="number" value={state.course_actual_price} onChange={(e) => handleChange("course_actual_price", e.target.value)} />
                </div>

                <div className='form_item'>
                    <label>Discounted(final_price)</label>
                    <input placeholder='Enter the discounted price' type='number' value={state.course_price} onChange={(e) => handleChange("course_price", e.target.value)} required />
                </div>
                <div className='form_item'>
                    <label>Skill level</label>
                    <select placeholder='Skill level' value={state.skill_level} onChange={(e) => { handleChange("skill_level", e.target.value) }} required>
                        <option disabled ></option>
                        <option value={"Beginner"}>Beginner</option>
                        <option value={"Advanced"} >Advanced</option>

                    </select>
                </div>
                <div className='form_item'>
                    <label>Upload the Thumbnail </label>
                    <input type='file' onChange={(e) => setThumbanil(e.target.files[0])} accept='image/*' />
                    {
                        thumbnail && (<img src={URL.createObjectURL(thumbnail)} width={300} height={300} alt="course-pic" />)
                    }
                    {
                        state.course_thumbnail && (
                            <>
                                <img src={state.course_thumbnail} alt='course_thumnail' width={300} height={300} />
                            </>
                        )

                    }
                </div>

                <div className='form_item'>
                    <TagsInput maxTags={5} value={tags} onChange={handletags} onlyUnique={true} />
                </div>
                <button type='button' id="button" onClick={handleCreate_course} disabled={sending ? true : false}>{sending ? "saving ..." : saved ? "Update" : "save"}</button>
            </form >
        </div >
    )
}

export default FirstStep