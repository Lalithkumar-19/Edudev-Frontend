import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "../Pages/Navbar";


const Profile = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [dp, setDp] = useState("");
    const [formData, setFormData] = useState({
        instructor_name: "",
        instructor_pic:"",
        about_instructor: "",
        address: "",
        email: "",
        phonenumber: "",
        profession: "",
        website: "",
        years_of_experience: "",
        social_media: {
            facebook: "",
            twitter: "",
            Linkedin: ""
        },
        skills: [],
    });
    const [add_newSkill, setNew_skill] = useState({ skillname: "", percent: "" });
    const Add_skill = () => {
        if (add_newSkill.skillname !== "" && add_newSkill.percent !== "") {
            setFormData({ ...formData, skills: [...formData.skills, add_newSkill] });
            setNew_skill({ skillname: "", percent: "" })
        }
        else {
            toast.error("Fill the skill name and valid percentage");
        }
    }

    const fetchUserData = async () => {
        try {
            const response = await axios.get("https://edudev-server-1.onrender.com/fetch_instructor_profile?token=" + localStorage.getItem("instructor-token"));
            setFormData(response.data);
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);



    const handleUpdateUser = async () => {
        try {
            const response = await axios.put(`https://edudev-server-1.onrender.com/Update_instructor_profile?token=${localStorage.getItem("instructor-token")}`, JSON.stringify(formData), {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200) {
                toast.success("Updated successfully");
                setIsEditing(false);
                location.reload();
            }
            else {
                toast.error("Updation failed ,try again later");
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Error updating user data", error);
        }
    };


    const handle_update_dp = async () => {
        try {
            const formdata = new FormData();
            formdata.append("dp", dp);
            const response = await axios.put(`https://edudev-server-1.onrender.com/Update_instructor_profile_pic?token=${localStorage.getItem("instructor-token")}`, formdata);
            if (response.status == 200) {
                toast.success("Updated profile pic successfully ");
                setDp("");
                location.reload();
            }
            else {
                toast.error("SOmething went wrong while updating profile pic")
            }
        } catch (error) {
            console.log("error", error);
            toast.error("SOmething went wrong while updating profile pic")
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    
    return (
        <div className="user_profile">
            <Navbar/>
            <h2>User Profile</h2>
            <Toaster position="bottom-right" />
            <div className="user_details">
                <img className="user_dp" src={formData.instructor_pic} alt="profile_pic" style={{background:"red"}}/>
                {
                    isEditing ? (
                        <>
                            <input type="file" accept="image/*" name="dp" style={{ marginBottom: "6px", background: " white", border: "none" }} onChange={(e) => { setDp(e.target.files[0]) }}
                            />
                        </>
                    ) : ""
                }
                <div className="input_divs">


                    <div className="input_item">
                        <label> Your Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="instructor_name"
                                value={formData.instructor_name}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span className="field_values">{formData.instructor_name}</span>
                        )}

                    </div>

                    <div className="input_item">
                        <label> Profession or Work</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="profession"
                                value={formData.profession}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span>{formData.profession}</span>
                        )}

                    </div>

                    <div className="input_item">
                        <label>About Yourself</label>
                        {isEditing ? (
                            <textarea
                                type="text"
                                name="about_instructor"
                                value={formData.about_instructor}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span>{formData.about_instructor}</span>
                        )}

                    </div>

                    <div className="input_item">
                        <label>Your Address</label>
                        {isEditing ? (
                            <textarea
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span> {formData.address}</span>
                        )}

                    </div>

                    <div className="input_item">
                        <label> Your Email</label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span>{formData.email}</span>
                        )}

                    </div>

                    <div className="input_item">
                        <label> Phone Number</label>
                        {isEditing ? (
                            <input
                                type="number"
                                name="phonenumber"
                                value={formData.phonenumber}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span>{formData.phonenumber}</span>
                        )}

                    </div>


                    <div className="input_item">
                        <label> Website Url</label>
                        {isEditing ? (
                            <input
                                type="number"
                                name="website"
                                value={formData.website}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span>{formData.website}</span>
                        )}

                    </div>


                    <div className="input_item">
                        <label>Years of Exprerinece</label>
                        {isEditing ? (
                            <input
                                type="number"
                                name="years_of_experience"
                                value={formData.years_of_experience}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span>{formData.years_of_experience}</span>
                        )}

                    </div>


                    <div className="input_item">
                        <label> Linkedin </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="linkedin"
                                value={formData.social_media.Linkedin}
                                onChange={(e) => { setFormData({ ...formData, social_media: { ...formData.social_media, Linkedin: e.target.value } }) }}
                            />
                        ) : (
                            <span>{formData.social_media.Linkedin}</span>
                        )}

                    </div>
                    <div className="input_item">
                        <label> Facebook </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="facebook"
                                value={formData.social_media.facebook}
                                onChange={(e) => { setFormData({ ...formData, social_media: { ...formData.social_media, facebook: e.target.value } }) }}
                            />
                        ) : (
                            <span>{formData.social_media.facebook}</span>
                        )}

                    </div>

                    <div className="input_item">
                        <label> Twitter </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="twitter"
                                value={formData.social_media.twitter}
                                onChange={(e) => { setFormData({ ...formData, social_media: { ...formData.social_media, twitter: e.target.value } }) }}
                            />
                        ) : (
                            <span>{formData.social_media.twitter}</span>
                        )}

                    </div>
                    <hr />
                    <h1 style={{ textAlign: "start", marginLeft: "0px", color: "#dc143" }}>Skills Section</h1>

                    <div className="input_item " id="skills_input">
                        <label> Skills you have</label>
                        {isEditing ? (

                            <>
                                <div id="skills_showing" >
                                    <div id="skill_shower_input">
                                        <input type="text" name="new_skill" placeholder="skill name" value={add_newSkill.skillname} onChange={(e) => setNew_skill({ ...add_newSkill, skillname: e.target.value })} />
                                        <input placeholder="percentage" type="number" min={30} max={100} value={add_newSkill.percent} onChange={(e) => { setNew_skill({ ...add_newSkill, percent: e.target.value }) }} /></div>
                                    <button id="button" onClick={Add_skill}>Add New skill</button>
                                </div>
                                {formData.skills.length > 0 ? (
                                    <>
                                        {formData.skills.map((item, index) => {
                                            return (<div id="skills_showing" key={index} >
                                                <div id="skill_shower_input">
                                                    <input type="text" name={item.skillname} value={formData.skills[index].skillname} placeholder="skill name" disabled />
                                                    <input placeholder="percentage" type="number" min={30} max={100} value={item.percent} disabled /></div>
                                            </div>
                                            )
                                        })}



                                    </>
                                ) : ""}
                            </>
                        ) : (
                            <>
                                {formData.skills.length > 0 ? (
                                    <>
                                        {formData.skills.map((item, index) => {
                                            return (<div id="skills_showing" key={index} >
                                                <span key={index}>{item.skillname} having know  {item.percent}%</span>
                                            </div>
                                            )
                                        })}
                                    </>
                                ) : ""}
                            </>)
                        }
                    </div>


                    <button id="button"
                        onClick={() => {
                            if (isEditing) {
                                handleUpdateUser();
                                if(dp!==""){
                                    handle_update_dp();
                                }
                            }
                            setIsEditing((prev) => !prev);

                        }}
                    >
                        {isEditing ? "Save" : "Edit"}
                    </button>

                </div>
            </div>



        </div>
    );
};

export default Profile;
