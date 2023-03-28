import styles from "./AbstractCard.module.css";
import DocCard from "../DocCard/DocCard";
import CitaCard from "../CitaCard/CitaCard";
import CheckoutDialog from '../../components/CheckoutDialog/Dialog'
import {updateUserConsulta} from '../../firebase/consult-service'
import Swal from 'sweetalert2';

// Componente que crea el molde para las cartas de los doctores, implementa el patrón Factoria Abstracta.

export default function Card({isDoc, Info}) {
    const canceladoAdvise=()=>{
        Swal.fire(
            '¡Cita cancelada con éxito!',
            'Gracias por su tiempo',
            'success'
          )
    }
    const call2Functions=()=>{
        updateUserConsulta(Info)
        canceladoAdvise()

    }


    return (
        
        <div className={styles.cardContainer} >
            <div className={styles.cardContainerImg}>
                {/* <img className={styles.cardImg} src={Info.imagen} alt="imagen"/> */}
            </div>
            <div className={styles.CardInfo}>
                
                {isDoc && (
                        <DocCard Info={Info}/>
                    )}
                    {!isDoc && (
                        <CitaCard Info={Info}/>
                    )}
            </div>
            <div className={styles.ButtonContainer}>
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
                        <button onClick={call2Functions()} className={styles.CardButton}>Cancelar Cita</button>
                    )}
            </div>
        </div>
    );
}