import{a as d,j as r,N as l}from"./index-ecc2254b.js";function o(){const s=d(e=>e.orders);return r.jsxs("div",{className:"orders_container",children:[r.jsx(l,{}),r.jsx("header",{className:"orders_header",children:r.jsxs("h2",{className:"header_top",children:["Home/",r.jsx("span",{style:{color:"coral"},children:"my orders"})]})}),s&&r.jsx("div",{className:"all_orders",children:r.jsxs("table",{children:[r.jsxs("tr",{children:[r.jsx("th",{children:"Product"}),r.jsx("th",{children:"Total"}),r.jsx("th",{children:"Payment Status"}),r.jsx("th",{children:"delivery Status"})]}),s&&Array.isArray(s)&&s.map((e,t)=>r.jsx(r.Fragment,{children:r.jsxs("tr",{children:[r.jsx("td",{children:Array.isArray(e.products)&&e.products.map((a,n)=>a.name+" , ")}),r.jsxs("td",{children:["Rs.",e.subtotal/100]}),r.jsx("td",{style:{color:"red",fontSize:"18px"},children:e.payment_status}),r.jsx("td",{style:{color:"red",fontSize:"18px"},children:e.delivery_status})]},t)}))]})}),!s&&r.jsx(r.Fragment,{children:r.jsx("h1",{style:{textAlign:"center",margin:"0 auto",marginTop:"30px"},children:"No orders placed yet"})})]})}export{o as default};