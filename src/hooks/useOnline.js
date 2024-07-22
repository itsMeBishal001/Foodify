import { useEffect, useState } from "react";

const useOnline=()=>{
const [isOnline,setIsOnline]=useState(true);
const onlineH=()=>{
    setIsOnline(true);
};
const oflineH=()=>{
    setIsOnline(false);
};
useEffect(()=>{
    window.addEventListener("online",onlineH);
    window.addEventListener("offline",oflineH);
    return ()=>{
        window.removeEventListener("online",onlineH);
    window.removeEventListener("offline",oflineH);
    }
   
},[]);
    return isOnline;
}
export default useOnline;