import React from 'react'
import GradeIcon from '@mui/icons-material/Grade';
import "../Styles/bannercomponent.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Banner_component() {
   const [searchText, setSearch_text] = useState("");
   const navigate = useNavigate();
   const handleSearch = () => {
      if (searchText !== "") {
         navigate(`/course_list/${searchText}`);
      }
   }


   return (
      <div className='banner_div'>
         <div className='first_box_header_lines'>
            Learn From Worldwide Creators Academy from Anywhere and Anytime
         </div>
         <div className='banner_text_quote'>
            Finding the right courses and mocktests in youtube is very tough.But we are Providing the Best for Best content and mock tests.
         </div>
         <div className='banner_search_input'>
            <input type='text' value={searchText} onChange={(e) => setSearch_text(e.target.value)} style={{ textIndent: "6px" }} placeholder='Search on EduDev website for courses....' />
            <button type='button' onClick={handleSearch} >SEARCH</button>
         </div>

         <div className='banner_bottom'>
            <span className='rating' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>4.5/5 rating for all courses
               <span style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", margin: "5px", color: "black" }}><GradeIcon fontSize='10px' /></span>
            </span>
         </div>
      </div>
   )
}

export default Banner_component;