import styles from "./CitaCard.module.css";


// Componente que retorna el contenido del molde de AbstractCard, dependiendo de la condición se mostrará DocCard o CitaCard.

//Nombre Doctor, fecha y hora, 
export default function CitaCard({Info}) {
    return (
        <div className={styles.CitacardContainer}>
            <div className={styles.CitaTopContainer}>
                <h1 className={styles.CardCitaTop}>{Info.NombreDoc} con</h1>
                <h1 className={styles.CardCitaTop}>{Info.NombrePaciente}</h1>
            </div>
            <div className={styles.CitaMidContainer}>
                <p className={styles.CardCitaMid}>Idioma: {Info.Idioma}</p>
            </div>
            <div className={styles.CitaBottomContainer}>
                <p className={styles.CardCitaBottom}>Fecha {Info.Fecha}</p>
                <p className={styles.CardCitaBottom}>Hora: {Info.Hora}</p>
            </div>
        </div>
    );
}
