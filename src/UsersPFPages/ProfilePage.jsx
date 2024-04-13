import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Admin_instructor/Profile.css";
import { Toaster, toast } from "react-hot-toast";
import { Publish } from "@mui/icons-material";
import Navbar from "../Pages/Navbar";


const Profilepage = () => {

    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [dp, setDp] = useState("");


    const fetchUserData = async () => {
        try {
            const response = await axios.get(`https://edudev-server-1.onrender.com/user_profile?token=${localStorage.getItem("token")}`);
            setUser({ ...response.data });
            localStorage.setItem("userdata", response.data.name);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handle_update_dp = async () => {
        try {
            const formdata = new FormData();
            formdata.append("dp", dp);
            const response = await axios.put("https://edudev-server-1.onrender.com/update_profile_pic?token=" + localStorage.getItem("token"), formdata);
            if (response.status == 200) {
                toast.success("Updated profile pic successfully ");
                setUser(response.data);
                localStorage.setItem("userdata", response.data.name);
                setDp("");
            }
            else {
                toast.error("SOmething went wrong while updating profile pic")
            }
        } catch (error) {
            console.log("error", error);
            toast.error("SOmething went wrong while updating profile pic")
        }
    }

    const handleUpdateUser = async () => {
        try {
            if (user.email !== "" && user.name !== "" && user.Addresses !== "" && user.profession !== "") {
                const response = await axios.put("https://edudev-server-1.onrender.com/update_profile?token=" + localStorage.getItem("token"), user);
                if (dp !== "") {
                    handle_update_dp();
                }
                else {
                    if (response.status === 200) {
                        setUser({ ...response.data });
                        localStorage.setItem("userdata", response.data.name);
                        toast.success("Successfully updated (:")
                        setIsEditing(false);
                    }
                    else {
                        toast.error("Internal server error occured ")
                    }
                    console.log(response.data, "data");

                }
            }
            else {
                toast.error("fill all the details");
            }

        } catch (error) {
            console.error("Error updating user data", error);
            setIsEditing(false);
            toast.error("something went wrong");
        }
    };




    return (
        <div className="user_profile">
            <Toaster />
            <Navbar/>
            <h2>User Profile</h2>
            <div className="user_details">
                {user ? (
                    <>
                        <img className="user_dp" src={user.dp} alt="profile_pic" />
                        {
                            isEditing ? (

                                <>
                                    <label htmlFor="file">
                                        <Publish className="userUpdateIcon" />
                                    </label>
                                    <input type="file" id="file" accept="image/*"  name="dp" style={{ display: "none" }}  onChange={(e) => { setDp(e.target.files[0]) }}/>
                                </>
                                // <input type="file" accept="image/*" name="dp" style={{ marginBottom: "6px", background: " white", border: "none" }} onChange={(e) => { setDp(e.target.files[0]) }}
                            ) : ""
                        }
                        <div className="input_divs">


                            <div className="input_item">
                                <label> Your Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={user.name}
                                        onChange={(e) => { setUser({ ...user, name: e.target.value }) }}
                                    />
                                ) : (
                                    <span className="field_values">{user.name}</span>
                                )}

                            </div>

                            <div className="input_item">
                                <label> Profession or Work</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="profession"
                                        value={user.profession}
                                        onChange={(e) => { setUser({ ...user, profession: e.target.value }) }}

                                    />
                                ) : (
                                    <span>{user.profession}</span>
                                )}

                            </div>




                            <div className="input_item">
                                <label>Your Address</label>
                                {isEditing ? (
                                    <textarea
                                        type="text"
                                        name="Addresses"
                                        value={user.Addresses}
                                        onChange={(e) => { setUser({ ...user, Addresses: e.target.value }) }}

                                    />
                                ) : (
                                    <span> {user.Addresses}</span>
                                )}

                            </div>

                            <div className="input_item">
                                <label> Your Email</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
                                    />
                                ) : (
                                    <span>{user.email}</span>
                                )}

                            </div>

                            <button id="button"
                                onClick={() => {
                                    if (!isEditing) {
                                        setIsEditing(true);
                                    }
                                    else {
                                        handleUpdateUser();
                                    }

                                }
                                }

                            >
                                {isEditing ? "Save" : "Edit"}
                            </button>

                        </div>

                    </>
                ) : "Loading..."}

            </div>



        </div>
    );
};

export default Profilepage;
