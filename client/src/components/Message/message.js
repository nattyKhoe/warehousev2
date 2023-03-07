// import { useState, useEffect } from "react";

// function PopUpMessage({message, time}) {

//     const [show, setShow] = useState(true);

//     useEffect(()=>{
//         const timeId = setTimeout(()=>{
//             setShow(false)
//         }, time)

//         return ()=>{
//             clearTimeout(timeId)
//         }
//     },[])

//     if(!show){
//         return null
//     }

//     return(
//         <div>

//         </div>    
//     )
// }