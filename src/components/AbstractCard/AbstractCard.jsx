import { useUserContext } from '../../contexts/UserContext';
import styles from "./AbstractCard.module.css";
import DocCard from "../DocCard/DocCard";
import CitaCard from "../CitaCard/CitaCard";
import CheckoutDialog from '../../components/CheckoutDialog/Dialog'

export default function Card({isDoc, Info}) {
    return (
        
        <div className={styles.cardContainer}>
            <div className={styles.cardContainerImg}>
                <img className={styles.cardImg} src={Info.imagen} alt="imagen"/>
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
                        <button className={styles.CardButton}>Cancelar Cita</button>
                    )}
            </div>
        </div>
    );
}



