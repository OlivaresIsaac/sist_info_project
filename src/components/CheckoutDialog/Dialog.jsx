import "./Dialog.css"
import { useEffect, useState } from "react";
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from "react-router"
import { CHECKOUTURL } from "../../constants/url";
import DatePicker from 'react-datepicker';
import moment from "moment/moment";
import { onSnapshot, doc } from "@firebase/firestore";
import { db} from "../../firebase/config"


// Componente que retorna un botón que muestra un dialog que pide información necesaria antes de proceder al Checkout. 

const CheckoutDialog = ({doctor}) => {
    const [showTaskDialog, setShowTaskDialog] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    let hour = [];
    const [count, setCount] = useState(0);
    const [nonAvaible, setNonAvaible] = useState([])
    const [hoursStrings, setHoursStrings] = useState(
        [
            "8:00 AM - 9:00 AM", "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM",
            "11:00 AM - 12:00 PM", "12:00 PM - 1:00 PM", "1:00 PM - 2:00 PM"
        ]
    )
    const [hourBooleans, setHourBooleans] = useState(
        [
            true, true, true, true, true, true
        ]
    )


    const navigate = useNavigate();

    // useEffect(() => {
    //     onSnapshot(doc(db, "doctors", doctor.id), (doc) => {
    //         setNonAvaible(doc.data().scheduleTaken)
    //     })
    //     if(checkDate(startDate, nonAvaible)){

    //     }

    // },[startDate])

    
    const buildChoosedData = () => {
        return {
            date: startDate,
            hour: hour,
            consultHours: count
        }
    }

    const navigateToCheckOut = () => {
        navigate(CHECKOUTURL, {
            state: {
                doctor: doctor,
                choosedData: buildChoosedData()}
        });
      };

    const confirm = () => {
        setShowTaskDialog(false);
        navigateToCheckOut();

    };

    const cancel = () => {
        setShowTaskDialog(false);
        setStartDate();
    };

    const Counter = () => {
        
        const handleSubtractOne = () => {
            setCount(count - 1);
        };

        const handleAddOne = () => {
            setCount(count + 1);
        };

        return(
            <div className="counter">
                <h1 className="h1_tittle"> Horas a contratar: </h1>
                <button onClick={handleSubtractOne}>-</button>
                <h2 className="hour-input"> {count} </h2>
                <button onClick={handleAddOne}>+</button>
            </div>
        )
    };


    const HourButton = ({newValue}) => {
        const [selected, setSelected] = useState(false)
        const buttonClass = selected ? 'timeBtn selected' : 'timeBtn';

        const handleHourChange = (newValue) => {
            setSelected(true);
            hour.push(newValue);
            // console.log(hour)
        }

        return(
            <button className={buttonClass} onClick={() => handleHourChange(newValue)} disabled={selected}>{newValue}</button>
        )
    }

    const checkDate = (date, nonAv) => {
        for(let i = 0; i < nonAv.lenght; i++){
            if(date == nonAv.date){

                return false
            }
        }
        return true
    }

    const checkHour = (hora, nonAv) => {
        for(let i = 0; i < nonAv.lenght; i++){
            if(hora == nonAv.hourBlock){
                return false
            }
        }
        return true
    }

    const DateBlocks = () => {
        
        return (
            <div className="dateBlock">
            {/* {
                hoursStrings.map((h, key) => {
                    return(
                        <HourButton newValue={h}/>
                    )
                })
            } */}

                <HourButton newValue="8:00 AM - 9:00 AM"/>
                <HourButton newValue="9:00 AM - 10:00 AM"/>
                <HourButton newValue="10:00 AM - 11:00 AM"/>
                <HourButton newValue="11:00 AM - 12:00 PM"/>
                <HourButton newValue="12:00 PM - 1:00 PM"/>
                <HourButton newValue="1:00 PM - 2:00 PM"/>
            </div>
        )
    }

    const DatesPicker = () => {      
        return (
            <div>
                <h1 className="date-tittle"> Fecha de la consulta: </h1>
                <div className="div-grid">
                    <DatePicker showIcon={true} selected={startDate} onChange={(date) => setStartDate(date)} minDate={moment().toDate()}/>
                    <DateBlocks/>
                </div>
            </div>
        );
      };
      

    const Dialog = ({show}) => {
        if (!show){
            return <></>;
        };
    
        return(
            <div className="overlay">
                <div className="dialog">   
                    <div className="dialog-content">
                        <div className="dialog-tittle-style"><h1 className="dialog-tittle"> Agendar cita con {doctor.displayName} </h1></div>
                            <div className="forms">
                                <DatesPicker/>
                                <Counter />
                            </div>
                        <div className="dialog-footer">
                            <button className="dialog-cancel" onClick={() => {cancel()}}> Cancelar </button>
                            <button className="dialog-confirm" onClick={() => {confirm()}}> Aceptar </button>
                        </div>
                    </div>
                </div>
            </div>    
        )};    

    return(
        <div>
            <button className="CardButtonDialog" onClick={() => {setShowTaskDialog(true)}}>Hacer Cita</button>
            {/* <button className='btn' onClick={() => {setShowTaskDialog(true)}}> Checkout Dialog </button> */}
            <Dialog show={showTaskDialog}/>
        </div>
        )
}


export default CheckoutDialog

