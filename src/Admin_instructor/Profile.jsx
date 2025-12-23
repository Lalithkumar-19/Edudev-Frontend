import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";
import { Toaster, toast } from "react-hot-toast";



const Profile = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [dp, setDp] = useState("");
    const [formData, setFormData] = useState({
        instructor_name: "",
        instructor_pic: "",
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
            <Toaster position="bottom-right" />
            <div className="profile_header">
                <h2>Your Profile</h2>
                <button
                    className={`edit_toggle_btn ${isEditing ? 'active' : ''}`}
                    onClick={() => {
                        if (isEditing) {
                            handleUpdateUser();
                            if (dp !== "") {
                                handle_update_dp();
                            }
                        }
                        setIsEditing((prev) => !prev);
                    }}
                >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
            </div>

            <div className="profile_card">
                <div className="profile_pic_section">
                    <div className="img_wrapper">
                        <img className="user_dp" src={formData.instructor_pic || "https://via.placeholder.com/150"} alt="profile_pic" />
                        {isEditing && (
                            <label className="upload_overlay">
                                <input type="file" accept="image/*" onChange={(e) => { setDp(e.target.files[0]) }} />
                                <span>Change Photo</span>
                            </label>
                        )}
                    </div>
                </div>

                <div className="input_grid">
                    <div className="input_group">
                        <label>Your Name</label>
                        {isEditing ? (
                            <input type="text" name="instructor_name" value={formData.instructor_name} onChange={handleInputChange} />
                        ) : (
                            <div className="read_only_field">{formData.instructor_name}</div>
                        )}
                    </div>

                    <div className="input_group">
                        <label>Profession / Title</label>
                        {isEditing ? (
                            <input type="text" name="profession" value={formData.profession} onChange={handleInputChange} />
                        ) : (
                            <div className="read_only_field">{formData.profession}</div>
                        )}
                    </div>

                    <div className="input_group full_width">
                        <label>About Yourself</label>
                        {isEditing ? (
                            <textarea name="about_instructor" value={formData.about_instructor} onChange={handleInputChange} />
                        ) : (
                            <div className="read_only_field text_area_view">{formData.about_instructor}</div>
                        )}
                    </div>

                    <div className="input_group full_width">
                        <label>Address</label>
                        {isEditing ? (
                            <textarea name="address" value={formData.address} onChange={handleInputChange} />
                        ) : (
                            <div className="read_only_field text_area_view">{formData.address || "No address added"}</div>
                        )}
                    </div>

                    <div className="input_group">
                        <label>Email</label>
                        {isEditing ? (
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                        ) : (
                            <div className="read_only_field">{formData.email}</div>
                        )}
                    </div>

                    <div className="input_group">
                        <label>Phone Number</label>
                        {isEditing ? (
                            <input type="number" name="phonenumber" value={formData.phonenumber} onChange={handleInputChange} />
                        ) : (
                            <div className="read_only_field">{formData.phonenumber}</div>
                        )}
                    </div>

                    <div className="input_group">
                        <label>Website</label>
                        {isEditing ? (
                            <input type="text" name="website" value={formData.website} onChange={handleInputChange} />
                        ) : (
                            <div className="read_only_field">{formData.website || "No website"}</div>
                        )}
                    </div>

                    <div className="input_group">
                        <label>Years of Experience</label>
                        {isEditing ? (
                            <input type="number" name="years_of_experience" value={formData.years_of_experience} onChange={handleInputChange} />
                        ) : (
                            <div className="read_only_field">{formData.years_of_experience || 0} Years</div>
                        )}
                    </div>

                    {/* Social Media Section */}
                    <div className="input_group full_width">
                        <h3 className="section_subtitle">Social Media</h3>
                    </div>

                    <div className="input_group">
                        <label>LinkedIn</label>
                        {isEditing ? (
                            <input type="text" value={formData.social_media.Linkedin}
                                onChange={(e) => { setFormData({ ...formData, social_media: { ...formData.social_media, Linkedin: e.target.value } }) }} />
                        ) : (
                            <div className="read_only_field">{formData.social_media.Linkedin || "Not linked"}</div>
                        )}
                    </div>
                    <div className="input_group">
                        <label>Facebook</label>
                        {isEditing ? (
                            <input type="text" value={formData.social_media.facebook}
                                onChange={(e) => { setFormData({ ...formData, social_media: { ...formData.social_media, facebook: e.target.value } }) }} />
                        ) : (
                            <div className="read_only_field">{formData.social_media.facebook || "Not linked"}</div>
                        )}
                    </div>
                    <div className="input_group">
                        <label>Twitter</label>
                        {isEditing ? (
                            <input type="text" value={formData.social_media.twitter}
                                onChange={(e) => { setFormData({ ...formData, social_media: { ...formData.social_media, twitter: e.target.value } }) }} />
                        ) : (
                            <div className="read_only_field">{formData.social_media.twitter || "Not linked"}</div>
                        )}
                    </div>

                </div>

                <hr className="divider" />

                <div className="skills_section">
                    <h3 className="section_subtitle">Skills</h3>

                    {isEditing && (
                        <div className="add_skill_row">
                            <input type="text" placeholder="Skill Name" value={add_newSkill.skillname} onChange={(e) => setNew_skill({ ...add_newSkill, skillname: e.target.value })} />
                            <input type="number" placeholder="%" min={0} max={100} value={add_newSkill.percent} onChange={(e) => { setNew_skill({ ...add_newSkill, percent: e.target.value }) }} />
                            <button className="add_skill_btn" onClick={Add_skill}>Add</button>
                        </div>
                    )}

                    <div className="skills_grid">
                        {formData.skills.map((item, index) => (
                            <div className="skill_badge" key={index}>
                                <span className="skill_name">{item.skillname}</span>
                                <span className="skill_percent">{item.percent}%</span>
                                {isEditing && (
                                    <button className="remove_skill" onClick={() => {
                                        const newSkills = formData.skills.filter((_, i) => i !== index);
                                        setFormData({ ...formData, skills: newSkills });
                                    }}>×</button>
                                )}
                            </div>
                        ))}
                        {formData.skills.length === 0 && <p className="no_skills">No skills added yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
