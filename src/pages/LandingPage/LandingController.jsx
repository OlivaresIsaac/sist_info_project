import { LandingPage } from "./LandingPage";
import { useState, useEffect} from "react"
import { getDoctors } from "../../firebase/doctors-service";


export function LandingController() {


  

// const data = {
//     id: "123",
//     Nombre: "Luis Domingos",
//     Idioma: "Español",
//     Especialidad: "Especialidad",
//     Price: "215466",
//     imagen: '../../assets/psydocs.png'
// }

const [doctors, setDoctors] = useState([])


// useEffect(() => {
    

//     const loadDoctors = async () => {
//         await getDoctors().then((result) => {
//             setDoctors(result)
//             // setDoctors(result)
//             console.log(result)
//         })
       
//     }

//     return () => {
//         loadDoctors()
//     };
// }, []);   
    
    return (
        <>
        <LandingPage doctors={doctors}/>
        </>
    )
}