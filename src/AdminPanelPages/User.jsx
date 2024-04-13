import {
  LocationSearching,
  MailOutline,
  Publish,
} from "@mui/icons-material";
import "./user.css";
import { useEffect, useRef } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function User({ view, id, rows, setrows }) {
  const user_dp = useRef(null);
  const [data, setData] = useState({});
  const [dp, setDp] = useState("");
  console.log(data);

  useEffect(() => {
    async function Fetch_User() {
      try {
        const res = await axios.get("https://edudev-server-1.onrender.com/get_single_user?id=" + id+"&token="+localStorage.getItem("admin_token"));
        if (res.status === 200) {
          setData({ ...res.data });
        } else {
          toast.error("internal server error occured");
        }
      } catch (error) {
        toast.error("Connecting to server is failed");
      }
    }
    Fetch_User();
  }, []);
  console.log(data);


  const handle_update_dp = async () => {
    try {
        const formdata = new FormData();
        formdata.append("dp",dp);
        const response = await axios.put("https://edudev-server-1.onrender.com/update_single_user_dp?token=" + localStorage.getItem("token")+"&id="+id, formdata);
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

  const update_user = async () => {
    try {
      if (data.name !== "" && data.Addresses !== "" && data.email !== "" && data.profession !== "") {
        if(dp!==""){
          handle_update_dp();
        }
        const res = await axios.put(`https://edudev-server-1.onrender.com/update_single_user?id=${id}&token=${localStorage.getItem("admin_token")}`, data);
        if (res.status === 200) {
          toast.success("updated successfully");
          let updated_data = Array.isArray(rows) && rows.map((item, i) => {
            if (item._id === id) {
              return { ...data, id: i };
            }
            return item;
          });
          setrows(updated_data);

        }
        else {
          toast.error("internal server error occured");
        }
      }
      else {
        toast.error("fill all fileds")
      }
    } catch (error) {
      toast.error("unable to connect with our servers");
    }

  }


  // function check() {
  //   if (data.name !== "" && data.email !== "" && data.profession !== "") {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">
          {view ? "" : "Edit User"}</h1>
      </div>
      <div className="userContainer">
        {/* {check() && (
          <> */}
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={dp ?URL.createObjectURL(dp): "https://edudev-server-1.onrender.com/"+data.dp}
              alt="pic"
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{data.name}</span>
              <span className="userShowUserTitle">{data.profession}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Contact Details</span>

            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{data.email ? data.email : "no email provided"}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{data.Addresses ? data.Addresses : "no address provided"}</span>
            </div>
          </div>
        </div>


        <div className="userUpdate">
          <span className="userUpdateTitle">User</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="annabeck99"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="userUpdateInput"
                  disabled={view ? true : false}

                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="userUpdateInput"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  disabled={view ? true : false}
                />
              </div>

              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                  onChange={(e) => setData({ ...data, Addresses: e.target.value })}
                  value={data.Addresses}
                  disabled={view ? true : false}

                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  ref={user_dp}
                  className="userUpdateImg"
                  src={dp ?URL.createObjectURL(dp): "https://edudev-server-1.onrender.com/"+data.dp}
                  alt="user _dp"
                />
                {
                  view ? "" : (
                    <>
                      <label htmlFor="file">
                        <Publish className="userUpdateIcon" />
                      </label>
                      <input type="file" id="file" style={{ display: "none" }} name="dp" onChange={(e)=>setDp(e.target.files[0])} />
                    </>
                  )
                }
              </div>
              {view ? "" : (
                <>
                  <button type="button" onClick={update_user} className="userUpdateButton">Update</button>
                </>
              )}
            </div>
          </form>
        </div>
        {/* </>)} */}
        {/* {
          !check()&& (
            <>
              <CircularProgress content="loading" color="secondary" />
            </>
          )
        } */}
      </div>
    </div>
  );
}