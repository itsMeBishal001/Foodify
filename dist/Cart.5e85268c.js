function e(e,s,t,l){Object.defineProperty(e,s,{get:t,set:l,enumerable:!0,configurable:!0})}var s=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequired804;s.register("2Q2r0",function(t,l){Object.defineProperty(t.exports,"__esModule",{value:!0,configurable:!0}),e(t.exports,"default",()=>c);var i=s("ayMG0"),d=s("jHTLJ"),a=s("gXdpO"),r=s("8Hjyi"),n=s("acw62"),c=()=>{let e=(0,d.useSelector)(e=>e.cart.items),s=(0,d.useDispatch)(),[t,l]=(0,n.useState)(0);(0,n.useEffect)(()=>{let s=e.reduce((e,s)=>e+s.price/100,0);l(s)},[e]);let c=()=>{s((0,r.clearCart)())};return(0,i.jsxs)("div",{className:"flex flex-grow pt-20 justify-between",children:[(0,i.jsxs)("div",{className:"w-2/3",children:[(0,i.jsx)("h1",{className:"font-bold text-3xl",children:"Cart Items "}),(0,i.jsx)("button",{className:"bg-green-100 p-2 m-5",onClick:()=>c(),children:"Clear Cart"}),(0,i.jsx)("div",{className:"mt-4",children:e.map(e=>(0,i.jsx)(a.default,{...e},e.id))})]}),(0,i.jsx)("div",{className:"w-1/3",children:(0,i.jsxs)("div",{className:" text-3xl",children:["Price Details",(0,i.jsxs)("div",{children:["total items - ",e.length]}),(0,i.jsxs)("div",{children:["Total Amount ₹ ",t]})]})})]})}}),s.register("gXdpO",function(t,l){e(t.exports,"default",()=>a);var i=s("ayMG0"),d=s("4GIhw"),a=({name:e,description:s,imageId:t,price:l})=>(0,i.jsxs)("div",{className:"bg-white rounded-lg shadow-md p-4 flex justify-between",children:[(0,i.jsx)("img",{src:d.IMG_CDN_URL+t,className:"w-24 h-24 object-cover rounded-md"}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"font-bold mt-2",children:e}),(0,i.jsx)("div",{className:"text-gray-500 text-sm",children:s}),(0,i.jsxs)("div",{className:"text-green-600 font-bold mt-2",children:["Rupees: ",l/100]})]})]})});
//# sourceMappingURL=Cart.5e85268c.js.map
