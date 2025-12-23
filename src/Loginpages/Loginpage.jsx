import React, { useState } from 'react'
import "./Loginpage.css";
import Navbar from '../Pages/Navbar';
import Education_login_pic from "../assets/Education_login.png";
import Contactpage from '../Pages/FooterPage';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import axios from 'axios';



function Loginpage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [instructor_login, setInstructor_login] = useState(false);
    const [admin_login, setadmin_login] = useState(false);
    const [signUp, setSignup] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [LoggedIn, setLoggedIn] = useState(false);

    // Forgot Password State
    const [forgotPassword, setForgotPassword] = useState(false);

    const handleResetPassword = () => {
        if (!email) {
            toast.error("Please enter your email");
            return;
        }
        // Mock logic for sending reset link
        toast.success("Reset link sent! Please check your email.");
        setTimeout(() => setForgotPassword(false), 3000);
    };


    const handleLogin = async () => {
        if (admin_login === false) {
            const login_user_url = `https://edudev-server-1.onrender.com/${signUp ? "signup" : "login"}`;
            const instructor_login_url = 'https://edudev-server-1.onrender.com/login-instructor';
            await axios.post(instructor_login ? instructor_login_url : login_user_url, { name, email, password }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    setLoggedIn(true);
                    if (signUp) {
                        toast.success("Signed Up successfully");
                        setSignup(false);
                        return;
                    }

                    if (instructor_login) {
                        localStorage.setItem("instructor-token", res.data);
                        setTimeout(() => {
                            navigate("/instructor_panel");
                        }, 2000)
                    } else {
                        localStorage.setItem("userdata", res.data.data);
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("id", res.data.id);
                        toast.success("Congrats Logged in successfully ");
                        setTimeout(() => {
                            navigate("/");
                        }, 2000)
                    }
                    dispatch({ type: "Userpresence", payload: 1 });
                    setName("");
                    setEmail("");
                    setPassword("");
                    setInstructor_login(false);
                }
                else {
                    setLoggedIn(false);
                    toast.error("Try Again to Login or check your credentials ")
                }

            }).catch((err) => {
                toast.error("Logged  failed");
                console.log(err.message);
            });
        } else {
            try {
                const res = await axios.post("https://edudev-server-1.onrender.com/admin_login", { email: email, password: password });
                if (res.status === 200) {
                    setadmin_login(false);
                    localStorage.setItem("admin_token", res.data.token);
                    localStorage.setItem("admin_logged", true);
                    toast.success("Loggined successfully");
                    setTimeout(() => {
                        navigate("/admin");
                    }, 2000)
                } else {
                    toast.error("Admin loggin failed");
                }
            } catch (error) {
                toast.error("Admin loggin failed &check your connection");

            }
        }

    }


    return (
        <div className='loginpage'>
            <Toaster position='top-center' reverseOrder={true} />
            <Navbar />
            <header className='login_header'>
                <h1 className='login_header_title'>
                    Login
                </h1>
                <span className='login_header_sub_title'>
                    Home/<span className='login_header_sub_sub_title'>
                        Login
                    </span>
                </span>
            </header>
            <section className='login_main'>
                <div className='login_main_left'>
                    <img src={Education_login_pic} width="500px" height={"500px"} alt="login_page_backdrop" />

                </div>
                <div className='login_main_right'>

                    {/* Forgot Password View */}
                    {forgotPassword ? (
                        <form className='login_form' onSubmit={(e) => e.preventDefault()}>
                            <h1 className='login_form_title'>Reset Password</h1>
                            <p className='login_form_sub_title'>Enter your email to receive a reset link</p>

                            <label className='login_label'>Email</label>
                            <input
                                type='email'
                                className='login_inputs'
                                placeholder='  ✉ Example@gmail.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <span className='Login_button' onClick={handleResetPassword}>Send Reset Link</span>

                            <div className='new_account'>
                                <span className='create_new' onClick={() => setForgotPassword(false)} style={{ color: "coral", cursor: "pointer", marginLeft: 0 }}>
                                    ← Back to Login
                                </span>
                            </div>
                        </form>
                    ) : (
                        /* Login / Signup View */
                        <form className='login_form' aria-autocomplete='off' autoComplete='off'>
                            <h1 className='login_form_title'>{signUp ? "SignUp to Explore " : "Log in to your Account"}</h1>
                            <p className='login_form_sub_title'>{signUp ? "Please enter required credentials" : "Welcome back! Please enter your details"}</p>

                            {
                                signUp ? (<>
                                    <label className='login_label'>Name</label>
                                    <input type='text' className='login_inputs' placeholder=' ✉ Name' value={name} autoComplete='Off' onChange={(e) => setName(e.target.value)} />

                                </>) : ""
                            }
                            <label className='login_label'>Email</label>
                            <input type='text' className='login_inputs' placeholder='  ✉ Example@gmail.com' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} />

                            <label className='login_label'>Password</label>
                            <input type='password' placeholder=' 🔐 Example@12345' autoComplete='off' className='login_inputs login_password_input' value={password} onChange={(e) => setPassword(e.target.value)} />

                            {!signUp ? (<div style={{ display: "flex", flexDirection: "row", gap: "4px", alignItems: "center", justifyContent: "start", marginBottom: "10px" }}>
                                <input type='checkbox' checked={instructor_login} onChange={(e) => setInstructor_login(e.target.checked)} />
                                <span className='instructor_login' style={{ color: "coral" }} >Instructor?</span>
                                <input type='checkbox' checked={admin_login} onChange={(e) => setadmin_login(e.target.checked)} />
                                <span className='instructor_login' style={{ color: "coral" }} >Admin?</span>
                            </div>) : ""}
                            {
                                !signUp ? (<span className='forgot_password' onClick={() => setForgotPassword(true)}>Forgot Password?</span>) : ""

                            }
                            <span className='Login_button' id='button' onClick={(ev) => handleLogin(ev)} >{signUp ? ("Sign Up") : "Login"}</span>


                            <div className='new_account'>
                                {signUp ? "Already have an account?" : "Don't have an account?"} <span className='create_new' onClick={() => setSignup(p => !p)} style={{ color: "coral", cursor: "pointer" }}>{signUp ? "Login" : "Create an account"}</span>
                            </div>
                        </form>
                    )}

                </div>
            </section>
            <Contactpage />
        </div>
    )
}

export default Loginpage