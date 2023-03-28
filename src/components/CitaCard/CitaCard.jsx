import styles from "./CitaCard.module.css";
import  {getDoctorProfile, getPacienteProfile}  from '../../firebase/doctors-service.js';
import { useState, useEffect } from "react";

// Componente que retorna el contenido del molde de AbstractCard, dependiendo de la condición se mostrará DocCard o CitaCard.

//Nombre Doctor, fecha y hora, 
export default function CitaCard({Info}) {
    const [doctorName, setDoctorName] = useState(null);
    const [doctorPac, setDoctorPac] = useState(null);
    const [doctorLang, setdoctorLang] = useState(null);
    const languages = ["Español", "Inglés", "Portugués", "Japonés", "Latín"];
    let date =  new Date(Info.date*1000);
    let stringDate = date.toString();

    useEffect(() => {
        const loadDoctor = async () => {
          await getDoctorProfile(Info.doctorId).then((result) =>{
              setDoctorName(result.displayName);
              setdoctorLang(result.preferedLanguage)
          })
          await getPacienteProfile(Info.patientId).then((result1) =>{
            setDoctorPac(result1.displayName);
        })
        }
        loadDoctor();
  
        return () => {
        
        };
      }, []);
    return (
        <div className={styles.CitacardContainer}>
            <div className={styles.CitaTopContainer}>
                <h1 className={styles.CardCitaTop}>{doctorName} con</h1>
                <h1 className={styles.CardCitaTop}>{doctorPac}</h1>
            </div>
            <div className={styles.CitaMidContainer}>
                <p className={styles.CardCitaMid}>Idioma: {languages[doctorLang-1]}</p>
            </div>
            <div className={styles.CitaBottomContainer}>
                <p className={styles.CardCitaBottom}>{stringDate}</p>
            </div>
        </div>
    );
}
