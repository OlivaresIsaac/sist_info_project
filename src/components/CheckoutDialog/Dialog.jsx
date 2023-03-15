import "./Dialog.css"
import { useState, useRef } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';

const CheckoutDialog = ({show}) => {
    const [showTaskDialog, setShowTaskDialog] = useState(false);

    const confirm = () => {
        setShowTaskDialog(false);
    };

    const cancel = () => {
        setShowTaskDialog(false);
    };

    const Counter = () => {
        const [count, setCount] = useState(0);
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
        const [startDate, setStartDate] = useState(new Date());
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
                        <div className="dialog-tittle-style"><h1 className="dialog-tittle"> Elija sus preferencias </h1></div>
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
            <button className='btn' onClick={() => {setShowTaskDialog(true)}}> Checkout Dialog </button>
            <Dialog show={showTaskDialog}/>
        </div>
        )
}


export default CheckoutDialog

