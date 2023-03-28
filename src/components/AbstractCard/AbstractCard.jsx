import styles from "./AbstractCard.module.css";
import DocCard from "../DocCard/DocCard";
import CitaCard from "../CitaCard/CitaCard";
import CheckoutDialog from '../../components/CheckoutDialog/Dialog'
import {updateUserConsulta} from '../../firebase/consult-service'
import { useEffect, useState } from "react";
import { DEFAULTPROFILE } from "../../constants/url";
import { getUserProfileById } from '../../firebase/users-service'
import Swal from 'sweetalert2';

// Componente que crea el molde para las cartas de los doctores, implementa el patrón Factoria Abstracta.

export default function Card({isDoc, Info}) {

     
    const [user, setUser] = useState(null)
  
   
    const [imageUrl, setImageUrl] = useState(DEFAULTPROFILE);
    
    const searchId = isDoc ? Info.id : Info.doctorId

    useEffect(() => {
    
        const loadUser = async () => {
         
              await getUserProfileById(searchId).then((result) => {
                    setUser(result)
                    setImageUrl(result.profilePic ? result.profilePic : DEFAULTPROFILE)
                  
                 
              })
          
        }
       
            loadUser();
        
      
    
       
    
        return () => {
        
        };
    
      }, []);
    

    const mostrarAlerta=()=>{
        Swal.fire(
            '¡Cita cancelada satisfactoriamente!',
            'Gracias por su tiempo',
            'success'
          )
    }
    const handleReloadAndUpdateConsulta = () => {
        mostrarAlerta();
        updateUserConsulta(Info);
    };
    return (
        <div className={styles.cardContainer} >
            <div className={styles.cardContainerImg}>
                <img className={styles.cardImg} src={imageUrl} alt="imagen"/>
            </div>
            <div className={styles.CardInfo}>
                
                {isDoc && (
                        <DocCard Info={Info} user={user}/>
                    )}
                    {!isDoc && (
                        <CitaCard Info={Info} />
                    )}
            </div>

            <div className={styles.ButtonContainer} user={user}>
                {isDoc && (
                    <>
                        {/* <button className={styles.CardButton}>Hacer Cita
                       
                        </button> */}

                        <div className={styles.CardButton}>
                        <CheckoutDialog doctor={Info}/>
                        </div>
                        
                    </>
                    )}
                    {!isDoc && (
                        <button onClick={handleReloadAndUpdateConsulta} className={styles.CardButton}>Cancelar Cita</button>
                    )}
            </div>
        </div>
    );
}