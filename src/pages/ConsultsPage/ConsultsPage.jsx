import './LandingPage.css'
import psicologo from '../../assets/psicologo.png'
import team from '../../assets/team2.png'
import AbstractCard from "../../components/AbstractCard/AbstractCard";
import { useState, useEffect } from "react"
import { getDoctors } from "../../firebase/doctors-service";


export function ConsultsPage(cita) {
    const [info, setInfo] = useState([])
    const [isDoc, setisDoc] = useState(false)
    
        
    useEffect(() => {
        
    
    const loadDoctors = async () => {
        await getDoctors().then((result) => {
            setInfo(result)
            // setDoctors(result)
            // console.log(result)
        })
           
    }
    
        loadCita()
    
        return () => {
          
        };
    }, []);   

    return (<div>
        <div className='abstractCardContainer'>
                {
                    info.map((cardInfo, key) => {
                       return(
                        <div className='abstractCard'> 
                       <AbstractCard Info={cardInfo} isDoc={isDoc} key={key}/>
                       </div> 
                       )
                    })
                }
               
            </div>
    </div>
    )
}

//Por realizar

