import{h as p,i as h,j as e,r as u,R as n,W as v}from"./index-ecc2254b.js";import{A as f,a as j,b as m}from"./AccordionSummary-0ac50022.js";var i={},g=h;Object.defineProperty(i,"__esModule",{value:!0});var s=i.default=void 0,A=g(p()),y=e,_=(0,A.default)((0,y.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");s=i.default=_;function R({heading:d,content:a}){const[o,l]=u.useState(!1),c=r=>(t,x)=>{l(x?r:!1)};return e.jsx("div",{children:e.jsxs(f,{expanded:o==="panel1",onChange:c("panel1"),children:[e.jsx(j,{expandIcon:e.jsx(s,{}),"aria-controls":"panel1bh-content",id:"panel1bh-header",children:e.jsx(n,{sx:{width:"100%",flexShrink:0,textAlign:"start",fontWeight:"900"},children:d})}),e.jsx(m,{children:e.jsx(n,{children:a&&Array.isArray(a)&&a.map((r,t)=>e.jsx("div",{children:e.jsxs(n,{sx:{width:"100%",flexShrink:0,textAlign:"start",display:"flex",alignItems:"center",justifyContent:"space-between",background:"",paddingLeft:"9px",border:"1px solid black",marginBottom:"6px"},children:[r.video_title,"  ",e.jsx("span",{className:"video_icon",children:e.jsx(v,{color:"primary"})},t)]},t)}))})})]})})}export{R as A};