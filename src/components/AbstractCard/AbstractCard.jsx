import { useUserContext } from '../../contexts/UserContext';
import styles from "./AbstractCard.module.css";
import DocCard from "../DocCard/DocCard";
import CitaCard from "../CitaCard/CitaCard";

export default function Card({isDoc, Info}) {
    const BASE_IMG_URL = "https://image.tmdb.org/t/p/original";
    return (
        <div className={styles.cardContainer}>
            <div>
                <img className={styles.cardImg} src={`${BASE_IMG_URL}${Info.imagen}`} alt="imagen"/>
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
                        <button className={styles.CardButton}>Hacer Cita</button>
                    )}
                    {!isDoc && (
                        <button className={styles.CardButton}>Cancelar Cita</button>
                    )}
            </div>
        </div>
    );
}



