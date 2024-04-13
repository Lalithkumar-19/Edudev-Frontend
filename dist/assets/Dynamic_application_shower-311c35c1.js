import{u as d,r as o,j as e,S as m,R as r}from"./index-ecc2254b.js";function p(){const n=d(),[i,c]=o.useState(!0),[a,s]=o.useState({instructor_name:"",about_instructor:"",instructor_pic:"",gender:"Male",address:"",email:"",password:"",phonenumber:null,website:"",college_name:"",year_of_passing:null,board_of_university:"",college_address:"",social_media:{facebook:"",twitter:"",Linkedin:""},skills:[],years_of_experience:null});return o.useEffect(()=>{(async()=>{await fetch(`https://edudev-server-1.onrender.com/get_single_instructor_application?id=${n.id}`,{method:"GET"}).then(t=>t.json()).then(t=>{s(t)})})()},[]),e.jsx("div",{className:"modal",children:e.jsx(m,{open:i,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",id:"modal_main_div",children:e.jsxs("div",{id:"modal_inner_main",children:[e.jsx(r,{id:"modal-modal-title",variant:"h6",component:"h2",sx:{borderRadius:"10px",fontSize:"20px",fontWeight:800,color:"coral"},children:"personal details"}),e.jsxs("div",{id:"modal-modal-description",sx:{mt:2},children:[e.jsx("label",{className:"modal_label",children:"Full Name "}),e.jsx("input",{className:"modal_input",placeholder:"Full Name",value:a.instructor_name,name:"instructor_name",type:"text",readOnly:!0}),e.jsx("label",{className:"modal_label",children:"Phone number"}),e.jsx("input",{className:"modal_input",value:a.phonenumber,name:"phonenumber",placeholder:" Number",maxLength:10,type:"text",readOnly:!0}),e.jsx("label",{className:"modal_label",children:"About Yourself"}),e.jsx("input",{className:"modal_input",value:a.about_instructor,name:"about_instructor",placeholder:"About instructor",type:"text",readOnly:!0}),e.jsx("label",{className:"modal_label",children:"Instructor Email"}),e.jsx("input",{className:"modal_input",value:a.email,name:"email",placeholder:"Instructor Email",type:"text",readOnly:!0}),e.jsx("label",{className:"modal_label",children:"Set a Password"}),e.jsx("input",{className:"modal_input",value:a.password,name:"password",placeholder:"Set a Password",type:"text",readOnly:!0}),e.jsx("label",{className:"modal_label",children:"Website Url"}),e.jsx("input",{className:"modal_input",value:a.website,name:"website",placeholder:"Website Url",type:"text",readOnly:!0}),e.jsx("label",{className:"modal_label",children:"Your Address"}),e.jsx("input",{className:"modal_input",value:a.address,name:"address",placeholder:" Address",type:"text",readOnly:!0}),e.jsx("label",{className:"modal_label",children:"Years of Experience"}),e.jsx("input",{className:"modal_input",value:a.years_of_experience,name:"years_of_experience",placeholder:"year of experience",type:"Number",readOnly:!0}),e.jsx("label",{className:"modal_label",children:"Gender"}),e.jsxs("div",{className:"gender_inputs_div",children:[e.jsx("input",{className:"modal_input_radio",placeholder:" Name",type:"radio",name:"gender",style:{accentColor:"coral",border:"none",cursor:"pointer"}}),e.jsx("span",{children:"Male"}),e.jsx("input",{className:"modal_input_radio",placeholder:" Name",type:"radio",name:"gender",style:{accentColor:"coral",border:"none",cursor:"pointer"}}),e.jsx("span",{children:"Female"})]}),e.jsx(r,{id:"modal-modal-title",variant:"h6",component:"h2",sx:{borderRadius:"10px",fontSize:"20px",fontWeight:800,color:"coral"},children:"Education"}),e.jsx("label",{className:"modal_label",children:"College or university name"}),e.jsx("input",{className:"modal_input",value:a.college_name,name:"college_name",placeholder:" Name",type:"text",readOnly:!0}),e.jsx("label",{className:"modal_label",children:"Year of passing"}),e.jsx("input",{className:"modal_input",value:a.year_of_passing,name:"year_of_passing",placeholder:" passing yaer",type:"number",readOnly:!0}),e.jsx("label",{className:"modal_label",children:"Board of University"}),e.jsx("input",{className:"modal_input",value:a.board_of_university,name:"board_of_university",placeholder:" University",type:"text",readOnly:!0}),e.jsx("label",{className:"modal_label",children:"College or University address"}),e.jsx("textarea",{id:"modal_text_area",value:a.college_address,name:"college_address",placeholder:" Address",readOnly:!0}),e.jsx(r,{id:"modal-modal-title",variant:"h6",component:"h2",sx:{borderRadius:"10px",fontSize:"20px",fontWeight:800,color:"coral"},children:"Social Media"}),e.jsx("label",{className:"modal_label",children:"Facebook"}),e.jsx("input",{className:"modal_input",value:a.social_media.facebook,name:"facebook",readOnly:!0,onChange:l=>{s({...a,social_media:{...a.social_media,facebook:l.target.value}})},placeholder:" Name",type:"text"}),e.jsx("label",{className:"modal_label",children:"Linkedin"}),e.jsx("input",{className:"modal_input",value:a.social_media.Linkedin,name:"Linkdenin",readOnly:!0,onChange:l=>{s({...a,social_media:{...a.social_media,Linkedin:l.target.value}})},placeholder:" Name",type:"text"}),e.jsx("label",{className:"modal_label",children:"Twitter (X)"}),e.jsx("input",{className:"modal_input",value:a.social_media.twitter,name:"twitter",readOnly:!0,onChange:l=>{s({...a,social_media:{...a.social_media,twitter:l.target.value}})},placeholder:" Name",type:"text"}),e.jsx(r,{id:"modal-modal-title",variant:"h6",component:"h2",sx:{borderRadius:"10px",fontSize:"20px",fontWeight:800,color:"coral"},children:"Profile picture"}),e.jsx("label",{className:"modal_label",children:"Upload Image"})]})]})})})}export{p as default};