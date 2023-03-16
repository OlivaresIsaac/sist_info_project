import styles from "./DocCard.module.css";

//Nombre doctor, idioma, especialidad, precio
export default function DocCard({Info}) {
    // Prefered language, 1 español, 2 ingles, 3 portugues, 4 japones, 5 latin
const languages = ["Español", "Inglés", "Portugués", "Japonés", "Latín"] 

    return (
        <div className={styles.DoccardContainer}>
            <div>
                <h1 className={styles.CardDoctorTop}>{Info.displayName}</h1>
            </div>
            <div className={styles.DocMidContainer}>
                <p className={styles.CardDoctorMid}>Idioma: {languages[Info.preferedLanguage-1]}</p>
            </div>
            <div className={styles.DocMidContainer}>
                <p className={styles.CardDoctorMid}>Especialidad: {Info.specialty}</p>
            </div>
            <div>
                <p className={styles.CardDoctorBottom}>Price: ${Info.pricePerHour}</p>
            </div>
        </div>
    );
}

