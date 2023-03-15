import styles from './CheckoutPage.module.css'
import temp_pfp from '../../assets/temp_pfp.png'
import Paypal from './CheckoutController'

export function CheckoutPage() {
    return (
        <>
        <div className={styles.mainFlex}>

         <div className={styles.infoCitaContainer}> 
            <h1 className={styles.cardTitle}> Información de cita</h1>
            <div className={styles.inncerInfoCita}> 
                <img src={temp_pfp} className={styles.doctorImg} alt='pysdocs'/>
                <div className={styles.doctorInfoContainer}>
                    <h1>Nombre doctor*</h1>
                    <h1>25 de marzo de 2023*</h1>
                    <h1>Hora 3pm*</h1>
                </div>
            
            </div>

            <h1 className={styles.cardTitle}>Facturación</h1>
            <div className={styles.inncerFacturacion}>
                <h1>Duracion: 3horas*</h1>
                <h1>Monto 10USD*</h1>
                <Paypal/>
            </div>
         </div>
    

        </div>
        </>
    )
}
