import React, { lazy } from "react"
import Homepage from "./Pages/Homepage"
import "../src/App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import { GetUser_details } from "./Redux/Freq_funcs"
//importing all components for routes 
import Loginpage from "./Loginpages/Loginpage"
import Course_list from "./Course_list/Course_list"
import Contact_page from "./Contact_page/Contact_page"
import Navbar from "./Pages/Navbar"
import Online_course_img from "./assets/courses.jpg"
import Contactpage from "./Pages/FooterPage"
import All_Instructors from "./Pages/All_Instructors"
import Admin from "./AdminPanels/Admin"
import Instructor_panel from "./AdminPanels/Instructor_panel"
import Notfoundpage from "./Pages/Notfoundpage"
import Profile from "./Admin_instructor/Profile"
import CoursesPage from './Pages/CoursesPage';
const Online_Course_overview = lazy(() => import("./Pages/Online_Course_overview"))
const Feautured_courses = lazy(() => import("./Pages/Feautured_courses"))
const Blogsshowingpage = lazy(() => import("./Pages/Blogsshowingpage"))
const Blogviewer = lazy(() => import("./Multiuse_Pages/Blogviewer"))
const Bookshopping = lazy(() => import("./Pages/Bookshopping"))
const Courseplayer = lazy(() => import("./Pages/Courseplayer"))
const Bookshopping_details = lazy(() => import("./Pages/Bookshopping_details"))
const Cartpage = lazy(() => import("./Pages/Cartpage"))
const About_instructor = lazy(() => import("./Multiuse_Pages/About_instructor"))
const Checkoutpage = lazy(() => import("./Pages/Checkoutpage"))
const Payment_Success = lazy(() => import("./PaymentPages/Payment_Success"))
const Faqpage = lazy(() => import("./FAQ_page/Faqpage"))
const Instructor_apply = lazy(() => import("./Instructor_Apply/Instructor_apply"))
const OrdersPage = lazy(() => import("./UsersPFPages/Orderspage"))
const Dynamic_application_shower = lazy(() => import("./Modals/Dynamic_application_shower"))
const Profilepage = lazy(() => import("./UsersPFPages/ProfilePage"))
const BlogEditor = lazy(() => import("./Pages/BlogWriting_page"))
const WishlistPage = lazy(() => import("./UsersPFPages/WIshlistPage"))
const MyLearningsPage = lazy(() => import("./UsersPFPages/My_learnings"))




function App() {

  useEffect(() => {
    GetUser_details();
  }, [])

  return (
    <>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Routes>
          //general routes for all to access
          <Route Component={Homepage} path="/" />
          <Route Component={Online_Course_overview} path="/courses/overview/:id" />
          <Route Component={Courseplayer} path="/courseplayer/:id" />
          <Route Component={Blogviewer} path="/selectedblog/:id" />
          <Route Component={All_Instructors} path="/instructors" />
          <Route Component={About_instructor} path="/instructors/about_instructor/:id" />
          <Route Component={Bookshopping} path="/bookshopping" />
          <Route Component={Bookshopping_details} path="/bookshopping/selected_book/:id" />
          <Route Component={Payment_Success} path="/yourcart/checkout/success" />
          <Route Component={Faqpage} path="/faqpage" />
          <Route Component={Loginpage} path="/login" />
          <Route path="/course_list/:search_word" Component={Course_list} />
          <Route path="/course_list" Component={Course_list} />
          <Route path="/contactUs" Component={Contact_page} />
          <Route path="/apply_instructor" element={<Instructor_apply header_footer={true} />} />
          <Route path="/blogwrite" Component={BlogEditor} />
          <Route Component={Cartpage} path="/yourcart" />
          <Route path="*" Component={Notfoundpage} />

          <Route element={<CoursesPage />} path="/courses" />

          <Route element={
            <>
              <Navbar />
              <div className="blogs_route">

                <Blogsshowingpage headingshow={false} />
                <Contactpage />
              </div>
            </>
          } path="/blogs" />


//restricted routes for certain people

          {localStorage.getItem("admin_token") &&
            <>
              <Route path="/admin" Component={Admin} />

            </>

          }

          <Route path="/application_see/:id" Component={Dynamic_application_shower} />
//for instructor
          {
            localStorage.getItem("instructor-token") ? <Route path="/instructor_panel" Component={Instructor_panel} /> : ""

          }

//for logged in people
          {/* {localStorage.getItem("token") && */}
          {/* <> */}
          <Route path="/myorders" Component={OrdersPage} />
          {/* <Route path="/profile" Component={Profile} /> */}
          <Route path="/yourWishlist" Component={WishlistPage} />
          <Route path="/MyLearnings" Component={MyLearningsPage} />
          <Route Component={Profilepage} path="/profile" />
          <Route Component={Checkoutpage} path="/yourcart/checkout" />

          {/* </>} */}
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
