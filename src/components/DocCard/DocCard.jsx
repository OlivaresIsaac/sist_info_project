import styles from "./DocCard.module.css";

//Nombre doctor, idioma, especialidad, precio
export default function DocCard({Info}) {
    return (
        <div className={styles.DoccardContainer}>
            <div>
                <h1 className={styles.CardDoctorTop}>{Info.Nombre}</h1>
            </div>
            <div className={styles.DocMidContainer}>
                <p className={styles.CardDoctorMid}>Idioma: {Info.Idioma}</p>
            </div>
            <div className={styles.DocMidContainer}>
                <p className={styles.CardDoctorMid}>Especialidad: {Info.Especialidad}</p>
            </div>
            <div>
                <p className={styles.CardDoctorBottom}>Price: {Info.Price}</p>
            </div>
        </div>
    );
}

