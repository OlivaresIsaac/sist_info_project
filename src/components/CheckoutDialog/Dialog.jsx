import "./Dialog.css"
import { useState, useRef } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import { useNavigate } from "react-router"
import { CHECKOUTURL } from "../../constants/url";

// Componente que retorna un botón que muestra un dialog que pide información necesaria antes de proceder al Checkout. 

const CheckoutDialog = ({doctor}) => {
    const [showTaskDialog, setShowTaskDialog] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [count, setCount] = useState(0);
    

    const navigate = useNavigate()

    const buildChoosedData = () => {
        return {
            date: startDate,
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
        navigateToCheckOut()
        
    };

    const cancel = () => {
        setShowTaskDialog(false);
    };

    const Counter = () => {
        
        const [quantity, setQuantity] = useState(0);

        const handleSubtractOne = () => {
            setCount(count - 1);
        };

        const handleAddOne = () => {
            setCount(count + 1);
        };

        const handleOnChange = (e) => {
            setQuantity(e.target.value);
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

    const DatesPicker = () => {
      
        return (
            <div>
                <h1 className="h1_tittle"> Fecha de la consulta: </h1>
                <DatePicker showIcon={true} selected={startDate} onChange={(date) => setStartDate(date)} minDate={moment().toDate()} />
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

