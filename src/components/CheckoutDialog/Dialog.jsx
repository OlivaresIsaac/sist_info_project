import "./Dialog.css"
import { useEffect, useState } from "react";
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from "react-router"
import { CHECKOUTURL } from "../../constants/url";
import DatePicker from 'react-datepicker';
import moment from "moment/moment";
import { onSnapshot, doc } from "@firebase/firestore";
import { db} from "../../firebase/config"
import { getDoctorProfile } from "../../firebase/doctors-service";


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
            false, false, false, false, false, false
        ]
    )
    const [showedButtons, setShowedButtons] = useState(hoursStrings)


    const navigate = useNavigate();

    useEffect(() => {

        const loadData = async () => {
            await getDoctorProfile(doctor.id).then((result) => {
                setNonAvaible(result.scheduleTaken)
                
                updateHoursbooleans()
               
            })
        }
        loadData()

       
        // if(checkDate(startDate, nonAvaible)){

        // }

    },[])

    
    const buildChoosedData = () => {
        let hora = hour.length
        return {
            date: startDate,
            hour: hour,
            consultHours: hora
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
        // const [isTaken, setIsTaken] = useState(false)
        let buttonClass = selected ? 'timeBtn selected' : 'timeBtn';

        console.log(hourBooleans, "booleano")
        //     if(isTaken) {
        //      buttonClass =  "timeBtn taken"
        // }
     
         

        const handleHourChange = (newValue) => {
            setSelected(true);
            hour.push(newValue);
            console.log(hour.lenght)
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

    const updateHoursbooleans = () => {
        const showedInfoAux = []
        hoursStrings.map((hourString, index) => {
            let dateMatches = false;
            let hourStringMathes = false;

           
            
            nonAvaible.forEach((scheduleObject) => {
                
                if (!dateMatches) {
                    console.log(new Date(scheduleObject.date*1000), "dateFirebase")
                    console.log(startDate, "dateLocal")
                    dateMatches = (startDate === (new Date(scheduleObject.date*1000))) 
                }
                if(!hourStringMathes) {
                   
                    hourStringMathes = (hourString === scheduleObject.hourBlock)
                }
                
            })

            // dateMatches = (index%2)===0
            // hourStringMathes = (index%2)===0

           if(!(dateMatches && hourStringMathes)) {
            showedInfoAux.push(hourString)
           }
            //      hourBooleans.push((dateMatches && hourStringMathes))
            
            // console.log(hoursStrings[index], "test")
        })

        setShowedButtons(showedInfoAux)
        console.log(showedInfoAux, "pudri")
    }

    const DateBlocks = () => {
        
        return (
            <div className="dateBlock">
            {
                showedButtons.map((string, key) => {
                    
                    
                        return(
                            <HourButton newValue={string} />
                        )
                    

                    
                })
            }

                {/* <HourButton newValue="8:00 AM - 9:00 AM"/>
                <HourButton newValue="9:00 AM - 10:00 AM"/>
                <HourButton newValue="10:00 AM - 11:00 AM"/>
                <HourButton newValue="11:00 AM - 12:00 PM"/>
                <HourButton newValue="12:00 PM - 1:00 PM"/>
                <HourButton newValue="1:00 PM - 2:00 PM"/> */}
            </div>
        )
    }

    const DatesPicker = () => {      
        return (
            <div>
                <h1 className="date-tittle"> Fecha de la consulta: </h1>
                <div className="div-grid">
                    <DatePicker showIcon={true} selected={startDate} onChange={(date) => changeDate(date)} minDate={moment().toDate()}/>
                    <DateBlocks/>
                </div>
            </div>
        );
      };

      const changeDate = (date) => {
        setStartDate(date)
        updateHoursbooleans()
      }
      

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
                                {/* counter should be comented */}
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

