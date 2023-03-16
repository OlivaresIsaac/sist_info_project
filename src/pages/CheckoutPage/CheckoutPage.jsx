import styles from './CheckoutPage.module.css'
import temp_pfp from '../../assets/temp_pfp.png'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";


export function CheckoutPage({setConsult, user}) {
    
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const location = useLocation();

    const doctor =  location.state.doctor
    const choosedData = location.state.choosedData
    //TODO Mostrar datos del doctor

    useEffect(() => {
        if (success) {
        //   alert("Pago exitoso!!");
        }
      },
      [success]
    );
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
        //   const { payer } = details;
          setSuccess(true);
          setConsult(createConsult())
        });
      };

      const createOrder = (data, actions) => {
        return actions.order
          .create({
            purchase_units: [
              {
                description: "Consulta con Nombredoctor*",
                amount: {
                  currency_code: "USD",
                  //TODO PONER VALOR CORRECTO
                  value: 20,
                },
              },
            ],
           
            application_context: {
              shipping_preference: "NO_SHIPPING",
            },
          })
          .then((orderID) => {
            setOrderID(orderID);
            return orderID;
          });
      };

      const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
      };

      const setConsultObject = () => {
        setConsult('A')
      }

      const createConsult = () => {
        const consult = {
            consultId: null,
            doctorId: doctor.id,
            patientId: user.id,
            hour: "3pm*", //TODO implementar hora correcta

            date: choosedData.date,
            payedAmount: 5 //TODO implementar monto correcto

        }
        return consult
      }

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
                
            </div>
            <PayPalScriptProvider options={{ "client-id": "test" }}>
                    <PayPalButtons style={{ layout: "horizontal" , tagline: false}} className={styles.paypalButton}
                     createOrder={createOrder}
                     onApprove={onApprove} 
                     onError={onError}/>
                </PayPalScriptProvider>
         </div>

       
    

        </div>
        </>
    )
}
