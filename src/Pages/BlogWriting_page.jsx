import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone';
import Navbar from "../Pages/Navbar";
import "./BlogWriting_page.css";
import TagsInput from 'react-tagsinput';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
const BlogEditor = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const[loading,setLoading]=useState(false);

    const handleTags = (tags) => {
        setTags(tags);
    }
    const handleCategories = (cats) => {
        setCategories(cats);
    }
    const onDrop = (acceptedFiles) => {
        // Allow only one image
        if (acceptedFiles.length > 0) {
            setImage(acceptedFiles[0]);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop,
    });
    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'link', 'image',
    ];
    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean'],
            ],
        },
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    };




    const handle_submit = async () => {
        if (title !== "" && content !== "" && image !== null && tags.length > 0 && categories.length > 0 && localStorage.getItem("token") !== null && localStorage.getItem("userdata") !== null) {
            try {
         setLoading(true);
                const formdata = new FormData();
                formdata.set("title", title);
                formdata.set("Blogcontent", content);
                formdata.append("backdrop_img", image);
                tags.forEach((item, index) => {
                    formdata.append(`tags`, item);
                });
                categories.forEach((item, index) => {
                    formdata.append(`categories`, item);
                });


                const response = await axios.post(`https://edudev-server-1.onrender.com/postblog?token=${localStorage.getItem("token")}`, formdata)
                if (response.status === 200) {
                    toast.success("Uploaded successfully");
                    setLoading(false);
                    setTitle("");
                    setContent("");
                    setImage(null);
                    setTags([]);
                    setCategories([]);
                }
                else {
                    toast.error("uploading blog is failed");
                    setLoading(false);
                }

            } catch (error) {
                console.log(error);
                setLoading(false);
                toast.error("internal server error occured");
            }
        }
        else {
            toast.error("Fill all fields before posting or login to post :))")
        }
    }

    return (
        <div className='Blog_writer'>
            <Navbar />
            <Toaster />
            <h1 className='blog_editor_title'>Blog Editor</h1>
            <div {...getRootProps()} className='dropzone'>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the image here...</p>
                ) : (
                    <p>Drag or drop an image here, or click to select a file</p>
                )}
            </div>
            {image && (
                <div className='images_preview'>
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Selected Image"
                    />
                </div>
            )}

            <div className='title_input_box'>
                <span className='input_tilte_heading'>Write title of blog</span>
                <input type='text' value={title} placeholder='Title for this blog' onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className='tags_input_box'>
                <span className='input_tilte_heading'>Write tags of blog</span>
                <TagsInput value={tags} onChange={handleTags} />
            </div>
            <div className='tags_input_box'>
                <span className='input_tilte_heading'>Write categories of blog</span>
                <TagsInput value={categories} onChange={handleCategories} />
            </div>
            <ReactQuill
                theme="snow"
                formats={formats}
                modules={modules}
                placeholder='Write the blog content here...'
                value={content}
                onChange={(value) => setContent(value)}
            />


            {/* <div className='button_div'> */}
            <button type="button" className='submit_button' onClick={handle_submit}>{!loading?"Upload":<CircularProgress/>}</button>
            {/* </div> */}


        </div>
    );
};




export default BlogEditor;
