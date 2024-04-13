import { useState } from "react";
import "./newUser.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function NewUser() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    Addresses: "",
    profession: "",
  })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handle_Create_User = async () => {
    try {
      if (data.Addresses !== "" && data.email !== "" && data.name !== "" && data.password !== "" && data.profession !== "") {
        const response = await axios.post(`https://edudev-server-1.onrender.com/create_new_user?token=${localStorage.getItem("admin_token")}`,data);
        if (response.status == 201) {
          toast.success("created a user");
          setData({
            name: "",
            email: "",
            password: "",
            Addresses: "",
            profession: "",
          });
        }
        else{
          toast.error("internal error occured ");
        }

      }
      else {
        toast.error("please fill all details")
      }


    } catch (error) {
      toast.error("internal error occured,while creating");
    }
  }
  return (
    <div className="newUser">
      <Toaster />
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john" name="name" value={data.name} required onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" name="email" value={data.email} onChange={handleChange} required />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" name="password" value={data.password} onChange={handleChange} required />
        </div>

        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" name="Addresses" value={data.Addresses} onChange={handleChange} required />
        </div>
        <div className="newUserItem">
          <label>profession</label>
          <input type="text" placeholder=" full stack engineer" name="profession" value={data.profession} onChange={handleChange} required />
        </div>

        <button className="newUserButton" type="button" onClick={handle_Create_User}>Create</button>
      </form>
    </div>
  );
}