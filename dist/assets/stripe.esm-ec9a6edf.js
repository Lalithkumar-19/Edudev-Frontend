var d="https://js.stripe.com/v3",s=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,u="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",p=function(){for(var r=document.querySelectorAll('script[src^="'.concat(d,'"]')),t=0;t<r.length;t++){var e=r[t];if(s.test(e.src))return e}return null},f=function(r){var t=r&&!r.advancedFraudSignals?"?advancedFraudSignals=false":"",e=document.createElement("script");e.src="".concat(d).concat(t);var n=document.head||document.body;if(!n)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return n.appendChild(e),e},v=function(r,t){!r||!r._registerWrapper||r._registerWrapper({name:"stripe-js",version:"2.1.7",startTime:t})},a=null,S=function(r){return a!==null||(a=new Promise(function(t,e){if(typeof window>"u"||typeof document>"u"){t(null);return}if(window.Stripe&&r&&console.warn(u),window.Stripe){t(window.Stripe);return}try{var n=p();n&&r?console.warn(u):n||(n=f(r)),n.addEventListener("load",function(){window.Stripe?t(window.Stripe):e(new Error("Stripe.js not available"))}),n.addEventListener("error",function(){e(new Error("Failed to load Stripe.js"))})}catch(o){e(o);return}})),a},w=function(r,t,e){if(r===null)return null;var n=r.apply(void 0,t);return v(n,e),n},c=Promise.resolve().then(function(){return S(null)}),l=!1;c.catch(function(i){l||console.warn(i)});var m=function(){for(var r=arguments.length,t=new Array(r),e=0;e<r;e++)t[e]=arguments[e];l=!0;var n=Date.now();return c.then(function(o){return w(o,t,n)})};export{m as l};
