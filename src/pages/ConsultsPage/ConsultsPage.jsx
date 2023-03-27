import AbstractCard from "../../components/AbstractCard/AbstractCard";
import { useState, useEffect } from "react"
import { getDoctors } from "../../firebase/doctors-service";
import { getConsultsById } from "../../firebase/consult-service";
import { useUserContext } from "../../contexts/UserContext";


export function ConsultsPage(cita) {
    const {user} = useUserContext()
    const [info, setInfo] = useState([])
    const [isDoc, setisDoc] = useState(false)
    
        
     useEffect(() => {
        
    
    const loadConsults = async () => {
        await getConsultsById(user.isDoctor, user.id).then((result) => {
            setInfo(result)
            console.log(result)
            // setDoctors(result)
            // console.log(result)
        })
           
    }
    
        loadConsults()
    
        return () => {
          
        };
    }, []);   

    return (<div>
        <div>
            Hola
        </div>
        
    </div>
    )
}

//Por realizar

