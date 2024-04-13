import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import axios from 'axios';
import UserEdit_Modal from '../Modals/UserEdit_Modal';
import toast, { Toaster } from 'react-hot-toast';
import { CircularProgress } from '@mui/material';


const new_window = (id) => {
  window.open("/instructors/about_instructor/" + id, "application_viewing_window", "height=400,width=800", "_blank");
}

export default function Instructors_manage() {
  const [data, setData] = React.useState([]);

  const Fetch_All_Users = async () => {
    try {
      const res = await axios.get(`https://edudev-server-1.onrender.com/Fetch_all_instructors?token=${localStorage.getItem("admin_token")}`);
      if (res.status === 200) {
        const row_data = res.data.map((item, index) => ({
          ...item,
          id: index + 1, // Assuming your IDs should start from 1
        }));
        setData(row_data);
      }
      else {
        toast.error("internal server error occured");
      }

    } catch (error) {
      toast.error("we are unable to connect to our servers");
      console.log(error);
    }
  }
  React.useEffect(() => {
    Fetch_All_Users();
  }, []);

  const handleDelete = async (id) => {
    try {
      let res = await axios.put(`https://edudev-server-1.onrender.com/delete_single_instructor?id=${id}&token=${localStorage.getItem("admin_token")}`);
      if (res.status === 200) {
        toast.success("deleted successfully");
        setData(data.filter((item) => item._id !== id));
      }
      else {
        toast.error("internal error occured");
      }
    } catch (error) {
      toast.error("connection to server failed");
    }
  }


  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "instructor_name",
      headerName: "instructor Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.instructor_pic} alt="list_pic_user" />
            {params.row.instructor_name}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "profession", headerName: "Profession", width: 200 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <UserEdit_Modal data={data} setdata={setData} User_id={params.row._id} key={params._id} />

            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },

    },
    {
      field: "Overview",
      headerName: "Overview",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <span style={{ cursor: "pointer" }} onClick={() => { new_window(params.row._id) }}>See</span>
          </>
        );
      }
    },
  ]

  return (
    <div className="userList">
      <Toaster gutter={3} />

      {
        data.length > 0 ? (<>
          <DataGrid
            rows={data}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
          />
        </>) : (<div style={{ textAlign: "center" }}><CircularProgress color="primary" content="Fetching data" /></div>)
      }
    </div>
  );
}
