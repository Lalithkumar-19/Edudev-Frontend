import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone';
import Navbar from "../Pages/Navbar";
import "./BlogWriting_page.css";
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'; // Add default styles for tagsinput
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const BlogEditor = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

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
        accept: {
            'image/*': []
        },
        onDrop,
        multiple: false
    });

    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'link', 'image',
    ];

    // Customized modules for a cleaner toolbar
    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean'],
            ],
        },
        clipboard: {
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
                tags.forEach((item) => {
                    formdata.append(`tags`, item);
                });
                categories.forEach((item) => {
                    formdata.append(`categories`, item);
                });

                const response = await axios.post(`https://edudev-server-1.onrender.com/postblog?token=${localStorage.getItem("token")}`, formdata)
                if (response.status === 200) {
                    toast.success("Blog published successfully!");
                    setLoading(false);
                    // Reset form
                    setTitle("");
                    setContent("");
                    setImage(null);
                    setTags([]);
                    setCategories([]);
                }
                else {
                    toast.error("Failed to upload blog.");
                    setLoading(false);
                }

            } catch (error) {
                console.error(error);
                setLoading(false);
                toast.error("Something went wrong. Please try again.");
            }
        }
        else {
            if (!img) toast.error("Please add a cover image.");
            else if (!title) toast.error("Please add a title.");
            else if (!content) toast.error("Please write some content.");
            else toast.error("Please fill all fields.");
        }
    }

    return (
        <div className='Blog_writer'>
            <Navbar />
            <Toaster position="top-center" />

            <div className='blog_editor_wrapper'>
                <h1 className='blog_editor_title'>Create New Blog Post</h1>

                <div className='editor_section'>
                    <div className='input_group'>
                        <label className='input_label'>Cover Image</label>
                        <div {...getRootProps()} className={`dropzone_container ${isDragActive ? 'active' : ''}`}>
                            <input {...getInputProps()} />
                            <FileUploadIcon style={{ fontSize: 40, marginBottom: '10px', opacity: 0.7 }} />
                            {isDragActive ? (
                                <p className='dropzone_text'>Drop the image here...</p>
                            ) : (
                                <p className='dropzone_text'>Drag & drop cover image, or click to select</p>
                            )}
                        </div>
                        {image && (
                            <div className='image_preview_container'>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Selected Blog Cover"
                                />
                            </div>
                        )}
                    </div>

                    <div className='input_group'>
                        <label className='input_label'>Title</label>
                        <input
                            type='text'
                            className='modern_input'
                            value={title}
                            placeholder='Enter an engaging title...'
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className='input_group'>
                        <label className='input_label'>Tags (Press Enter to add)</label>
                        <TagsInput
                            value={tags}
                            onChange={handleTags}
                            inputProps={{ placeholder: 'Add a tag...' }}
                        />
                    </div>

                    <div className='input_group'>
                        <label className='input_label'>Categories (Press Enter to add)</label>
                        <TagsInput
                            value={categories}
                            onChange={handleCategories}
                            inputProps={{ placeholder: 'Add a category...' }}
                        />
                    </div>

                    <div className='input_group'>
                        <label className='input_label'>Content</label>
                        <ReactQuill
                            theme="snow"
                            formats={formats}
                            modules={modules}
                            placeholder='Start writing your story...'
                            value={content}
                            onChange={setContent}
                        />
                    </div>

                    <div className='submit_btn_container'>
                        <button type="button" className='submit_btn' onClick={handle_submit} disabled={loading}>
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Publish Blog"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogEditor;
