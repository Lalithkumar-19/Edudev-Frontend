import{a as o,j as s,N as u,Q as l}from"./index-ecc2254b.js";function i(){const e=o(r=>r.My_learnings);return s.jsxs("div",{className:"featured_courses",children:[s.jsx(u,{}),s.jsx("h3",{className:"category_heading",children:"Your Learnings"}),s.jsx("div",{className:"category_title_box",children:s.jsx("span",{className:"category_sub_quote",children:"Buyed courses"})}),s.jsxs("div",{className:"courses_box",children:[Array.isArray(e)&&e.map((r,a)=>s.jsx(s.Fragment,{children:r&&s.jsx(l,{course_thumnail:r.course_thumbnail,course_duration:r.course_duration,course_name:r.course_name,course_price:r.course_price,id:r._id,skill_level:r.skill_level,course_lectures:r.course_lectures,wished_list:!0,creator:r.creator,buyed:Array.isArray(e)&&e.some(c=>c._id===r._id)},a)})),Array.isArray(e)&&e.length===0&&s.jsx("h1",{children:"No courses you have brought"})]})]})}export{i as default};