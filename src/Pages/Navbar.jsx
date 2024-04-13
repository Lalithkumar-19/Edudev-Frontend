import React from 'react';
import "../Styles/Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import Dropdown from '../Modals/Dropdown';


function Navbar() {
  const cartitems = useSelector(state => state.cart);
  const navigate = useNavigate();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 4,
      backgroundColor: "coral"
    },
  }));

  return (
    <div className='navbar'>
      <h2 style={{ cursor: "pointer" }} onClick={() => { navigate("/"); location.reload(); }}>EduDev</h2>
      <ul className='navbar_menu'>
        <li className='main'><Link to={"/courses"}>Courses</Link> </li>
        <li className='main'><Link to={"/blogs"}>Blogs</Link> </li>
        <li className='main'><Link to={"/instructors"}>Instructors</Link></li>
        <li className='main'><Link to={"/bookshopping"}>Books</Link></li>
        <li className='main'><Link to={"/faqpage"}>FAQ</Link></li>
        <li className='main'><Link to={"/blogwrite"}>Write Blog</Link></li>


      </ul>
      <div className='Activity_buttons'>
        <div className='my_self' id='my_self'>
          {localStorage.getItem("token") && localStorage.getItem("userdata") && <Dropdown />}

        </div>
        {localStorage.getItem("token") &&
          <span className='bucket_icon'> <Link to="/yourcart">
            <StyledBadge badgeContent={cartitems && cartitems.length} color="primary">
              <ShoppingCartIcon />
            </StyledBadge>
          </Link>
          </span>
        }
        {localStorage.getItem("userdata") ? (
          <>
            <h3 style={{ marginLeft: "5px", marginRight: "2px", color: "blue", fontSize: "14px" }}> Welcome {localStorage.getItem("userdata")}</h3>
          </>
        ) : <button type='button' id='button' onClick={() => navigate("/login")}>Login</button>
        }
      </div>
    </div>
  )
}

export default Navbar