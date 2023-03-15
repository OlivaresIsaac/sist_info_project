import styles from './CheckoutPage.module.css'
import temp_pfp from '../../assets/temp_pfp.png'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation } from "react-router-dom";


export function CheckoutPage() {
    const location = useLocation();
    const doctor =  location.state.doctor
    const choosedData = location.state.choosedData
    //TODO Mostrar datos del doctor
    // console.log(location)
    console.log(choosedData.date)
    // console.log(doctor)

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Nomviembre", "Diciembre"
];

    return (
        <>
        <div className={styles.mainFlex}>

         <div className={styles.infoCitaContainer}> 
            <h1 className={styles.cardTitle}> Información de cita</h1>
            <div className={styles.inncerInfoCita}> 
                <img src={temp_pfp} className={styles.doctorImg} alt='pysdocs'/>
                <div className={styles.doctorInfoContainer}>
                    <h1>Nombre doctor*</h1>
                    <h1>{choosedData.date.getDate()} de {monthNames[choosedData.date.getMonth()]} de {choosedData.date.getFullYear()}</h1>
                    <h1>Hora 3pm*</h1>
                </div>
            
            </div>

            <h1 className={styles.cardTitle}>Facturación</h1>
            <div className={styles.inncerFacturacion}>
                <h1>Duracion: {choosedData.consultHours} horas</h1>
                <h1>Monto 10USD*</h1>
                <PayPalScriptProvider options={{ "client-id": "test" }}>
                    <PayPalButtons style={{ layout: "horizontal" }} />
                </PayPalScriptProvider>
            </div>
         </div>

       
    

        </div>
        </>
    )
}
