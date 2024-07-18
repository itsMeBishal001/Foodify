var e=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequired804;e.register("2rAUd",function(s,r){Object.defineProperty(s.exports,"__esModule",{value:!0,configurable:!0}),Object.defineProperty(s.exports,"default",{get:()=>l,set:void 0,enumerable:!0,configurable:!0});var i=e("ayMG0");e("acw62");var t=e("7YFi7"),a=e("hEJWZ");let d=a.object({email:a.string().email("Invalid email address").required("Required"),password:a.string().required("Required"),role:a.string().required("Required")});var l=()=>(0,i.jsx)("div",{className:"flex items-center justify-center min-h-screen bg-gray-200",children:(0,i.jsxs)("div",{className:"w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg",children:[(0,i.jsx)("div",{className:"text-2xl font-bold mb-4",children:"Sign In"}),(0,i.jsx)("div",{className:"text-sm mb-4",children:"Sign in to your account"}),(0,i.jsxs)("div",{className:"flex justify-center mb-4 space-x-4",children:[(0,i.jsx)("button",{className:"px-4 py-2 text-xs text-gray-500 border border-gray-300 rounded-md",children:"Sign in with Google"}),(0,i.jsx)("button",{className:"px-4 py-2 text-xs text-gray-500 border border-gray-300 rounded-md",children:"Sign in with Apple"})]}),(0,i.jsx)(t.Formik,{initialValues:{email:"",password:"",role:""},validationSchema:d,onSubmit:e=>{console.log(e)},children:({isSubmitting:e})=>(0,i.jsxs)(t.Form,{className:"space-y-4",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{htmlFor:"email",className:"block text-sm mb-1",children:"Email address"}),(0,i.jsx)(t.Field,{type:"email",name:"email",className:"w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:border-indigo-500"}),(0,i.jsx)(t.ErrorMessage,{name:"email",component:"div",className:"text-red-500 text-xs mt-1"})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{htmlFor:"password",className:"block text-sm mb-1",children:"Password"}),(0,i.jsx)(t.Field,{type:"password",name:"password",className:"w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:border-indigo-500"}),(0,i.jsx)(t.ErrorMessage,{name:"password",component:"div",className:"text-red-500 text-xs mt-1"})]}),(0,i.jsx)("div",{className:"text-right text-sm text-blue-500 cursor-pointer",children:"Forgot password?"}),(0,i.jsx)("button",{type:"submit",disabled:e,className:"w-full py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none",children:"Sign in"})]})}),(0,i.jsxs)("div",{className:"text-center text-sm mt-4",children:[(0,i.jsx)("span",{children:"Don’t have an account? "}),(0,i.jsx)("a",{href:"/register",className:"text-blue-500",children:"Register here"})]})]})})});
//# sourceMappingURL=LogIn.8fa0f4c9.js.map
