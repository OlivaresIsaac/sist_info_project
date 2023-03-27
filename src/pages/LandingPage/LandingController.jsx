import { LandingPage } from "./LandingPage";
import { useState, useEffect} from "react"
import { getDoctors } from "../../firebase/doctors-service";

//LandingController estar para a futuro los querys para traer los doctores
export function LandingController() {


  

// const data = {
//     id: "123",
//     Nombre: "Luis Domingos",
//     Idioma: "Español",
//     Especialidad: "Especialidad",
//     Price: "215466",
//     imagen: '../../assets/psydocs.png'
// }




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
        <LandingPage />
        </>
    )
}