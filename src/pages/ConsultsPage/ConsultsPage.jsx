import AbstractCard from "../../components/AbstractCard/AbstractCard";
import styles from "./ConsultsPage.module.css";
import { useState, useEffect } from "react"
import { getDoctors } from "../../firebase/doctors-service";
import { getConsultsById } from "../../firebase/consult-service";
import { useUserContext } from "../../contexts/UserContext";
import Swal from 'sweetalert2';


export function ConsultsPage(cita) {
    const {user} = useUserContext()
    const [info, setInfo] = useState([])
    const [isDoc, setisDoc] = useState(false)
    const noCitas=()=>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡No tienes citas por ahora!',
          })
    }
    
        
     useEffect(() => {
        
    
    const loadConsults = async () => {
        await getConsultsById(user.isDoctor, user.id).then((result) => {
            setInfo(result)
            const consultToShow = []
            result.forEach((consult)=> {
                if(consult.status != "cancelada"){
                    consultToShow.push(consult)
                }
            })
            setInfo(consultToShow)
            console.log(result)
        })
           
    }
    
        loadConsults()
    
        return () => {
          
        };
    }, []);   
    if(info.length>0){
        return (<div className={styles.Consulta}>
            <div className={styles.tituloConsulta}>
                Consultas Asignadas
            </div>
            <div className={styles.abstractCardContainer}>
                    {
                        info.map((cardInfo, key) => {
                            return(
                                <div className={styles.abstractCard}> 
                                   <AbstractCard Info={cardInfo} isDoc={isDoc} key={key}/>
                                </div>
                            )
                        })
                    }
                </div>
        </div>
        )
    }
    else{
        return noCitas();
    }
}
