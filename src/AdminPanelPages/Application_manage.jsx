import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { AccessibilitySharp, NotAccessibleSharp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';





const new_window = (id) => {
    window.open("admin/application_see/" + id, "application_viewing_window", "height=400,width=800", "_blank")
}



export default function Application_manage() {
    const rows = [];
    const [data, setData] = useState([]);

    const handleDelete = async (id) => {
        await fetch(`https://edudev-server-1.onrender.com/delete_single_instructor_application?id=${id}&?token=${localStorage.getItem("admin_token")}`).then(res => {
            if (res.status === 200) {
                toast.success("Succesfuuly denied Application");
                rows.forEach(item=>{
                    if(item.id===id){
                       let index= rows.indexOf(item);
                       rows.splice(index,1);
                    }
                })
            }
            else {
                toast.error("Internal server error occured")
            }
        })
        console.log(id);

    }
    const handleGranted = async (id) => {
        await fetch(`https://edudev-server-1.onrender.com/grant_single_instructor_application?id=${id}&token=${localStorage.getItem("admin_token")}`).then(res => {
            if (res.status === 200) {
                toast.success("Succesfuuly Granted Application");
            }
            else {
                toast.error("Internal server error occured")
            }
        })
        console.log(id);

    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'Name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'Email',
            headerName: 'Email',
            width: 150,
            editable: true,
        },
        {
            field: 'phone',
            headerName: 'Phone number',
            type: 'number',
            width: 110,
            editable: true,
        },

        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <AccessibilitySharp
                            className="userListDelete"
                            onClick={() => handleGranted(params.row.id)}
                        />
                        <NotAccessibleSharp
                            className="userListDelete"
                            onClick={() => handleDelete(params.row.id)}
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
                        <span style={{ cursor: "pointer" }} onClick={() => { new_window(params.row.id) }}>See</span>
                    </>
                );
            },
        },
    ];



    useEffect(() => {
        const fetchdata = async () => {
            await fetch('https://edudev-server-1.onrender.com/get_instructor_applications', {
                method: "GET",
            }).then(res => {
                res.json().then(d => {
                    setData(d);
                    console.log("response", d);
                });
            })


        };
        fetchdata();

    }, []);
    console.log(data, "data");
    data && data.map(item => {
        let row_item = { id: item._id, Name: item.instructor_name, Email: item.email, phone: item.phonenumber }
        console.log(row_item, "row_item");
        rows.push(row_item);
    })

    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <Toaster />
            <h1>Aplications Management</h1>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 7,
                        },
                    },
                }}
                pageSizeOptions={[7]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}
