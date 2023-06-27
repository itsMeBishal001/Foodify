import { useEffect, useState } from "react";


//removing event lissners is a good practice because it not stop after returning

const useOnline=()=>{
const [isOnline,setIsOnline]=useState(true);
useEffect(()=>{
    window.addEventListener("online",()=>{
        setIsOnline(true);
    });
    window.addEventListener("offline",()=>{
        setIsOnline(false);
    });
   
},[]);
    return isOnline;
}
export default useOnline;