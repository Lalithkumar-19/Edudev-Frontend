import{j as e,a as N,u as b,r,N as f,P as y,p as C,g as w,d as k,C as A,e as S}from"./index-ecc2254b.js";import{v as P}from"./video2-644c0221.js";function j({notice_board:a}){return e.jsx("div",{className:"notice_board",children:e.jsx("p",{className:"notice_info",dangerouslySetInnerHTML:{__html:a}})})}function R({assignments:a}){return e.jsx("div",{className:"assignments",children:e.jsx("p",{className:"assignment_details",dangerouslySetInnerHTML:{__html:a}})})}function $({}){N(l=>l.My_learnings);const{id:a}=b(),[u,n]=r.useState(!0),[d,o]=r.useState(!1),[s,v]=r.useState(null),[_,p]=r.useState(s&&s.course_intro_video),[i,c]=r.useState(0),[m,h]=r.useState(!1);function x(){switch(i){case 1:return e.jsx(j,{notice_board:s.noticeboard});case 2:return e.jsx(R,{assignments:s.assignments});default:return e.jsx(j,{notice_board:s.noticeboard})}}r.useEffect(()=>{async function l(){await S.get("https://edudev-server-1.onrender.com/get_single_course?id="+a).then(t=>{v(t.data[0]),console.log(t.data)}).catch(t=>{console.log(t)})}l()},[]);function g(){switch(i){case 1:n(!0),o(!1);break;case 2:n(!1),o(!0);break;default:n(!0),o(!1)}}return r.useEffect(()=>{g()},[i]),r.useEffect(()=>{window.innerWidth<=400?h(!0):h(!1)}),e.jsxs("div",{className:"courseplayer",children:[e.jsx(f,{}),s!==null?e.jsxs("div",{className:"course_player_main",children:[e.jsxs("section",{className:"courseplayer_left",children:[e.jsx("div",{className:"course_video_player",children:e.jsx(y,{src:_||P,pictureInPicture:!0})}),e.jsxs("section",{className:"course_meta_details",children:[e.jsxs("div",{className:"course_creator_details",children:[e.jsx("div",{className:"course_creator_pic",children:e.jsx("img",{src:s.creator.instructor_pic||C,width:"100%",style:{objectFit:"cover",borderRadius:"100%"},height:"100%",alt:"course_creator_details"})}),e.jsxs("div",{className:"course_creator_name_role",children:[e.jsx("span",{className:"course_creator_name",children:s.creator.instructor_name}),e.jsx("span",{className:"course_creator_role",children:s.creator.profession})]})]}),e.jsxs("div",{className:"course_reviews",children:[e.jsx("span",{className:"course_reviews_heading",children:"Review"}),e.jsxs("span",{className:"course_ratings",children:["4.3 (",Array.isArray(s.Reviews)&&s.Reviews.length," Reviews) *****"]})]})]}),!m&&e.jsxs("section",{className:"course_main_headlines",id:"course_main_headlines",children:[e.jsx("span",{className:"course_headline",children:s.course_name}),e.jsx("p",{className:"course_main_desc",children:s.course_description}),e.jsxs("div",{className:"selector_buttons",id:"vidoe_Player_selection_buttons",children:[e.jsx("button",{id:"buttons_in_course_video",style:{backgroundColor:u?"coral":"transparent"},onClick:()=>{c(1)},children:"Noticeboad"}),e.jsx("button",{id:"buttons_in_course_video",style:{backgroundColor:d?"coral":"transparent"},onClick:()=>{c(2)},children:"Assignments"})]}),x()]})]}),e.jsxs("section",{className:"courseplayer_right",children:[e.jsx(w,{curiculm:s.curriculm,curr_video:p}),m&&e.jsxs("section",{className:"course_main_headlines",id:"course_main_headlines",children:[e.jsx("span",{className:"course_headline",children:s.course_name}),e.jsx("p",{className:"course_main_desc",children:s.course_description}),e.jsxs("div",{className:"selector_buttons",id:"vidoe_Player_selection_buttons",children:[e.jsx("button",{id:"buttons_in_course_video",style:{backgroundColor:u?"coral":"transparent"},onClick:()=>{c(1)},children:"Noticeboad"}),e.jsx("button",{id:"buttons_in_course_video",style:{backgroundColor:d?"coral":"transparent"},onClick:()=>{c(2)},children:"Assignments"})]}),x()]})]})]}):e.jsx("div",{style:{margin:"0 auto",marginTop:"50px"},children:e.jsx(k,{})}),e.jsx(A,{})]})}export{$ as default};