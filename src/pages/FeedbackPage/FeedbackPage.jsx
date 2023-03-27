
//import React, { useState } from "react";
import "./FeedbackPage.css";
import {useState,useEffect} from "react";
import { getDoctorProfile } from "../../firebase/doctors-service";
import {AiFillStar,AiOutlineStar} from "react-icons/ai";
import { getUserProfile } from "../../firebase/users-service";
import { useUserContext } from "../../contexts/UserContext";
import { updateDoctorFeedback } from "../../firebase/feedback-service";
import Swal from 'sweetalert2';
//FeedBackPage se encarga de mostrar el 5 rating stars y la caja de comentarios al doctor
export function FeedbackPage() {
    const {user} = useUserContext()
    const [doctor, setDoctor] = useState({displayName:"",specialty:""});
    const [feedback,setFeedback]=useState({displayName:user.displayName,hoverStar:0,comentario:""})
    const handleOnChange = (event) => {
        const {name, value} = event.target
        setFeedback({
            ...feedback,
            [name]: value
        })
    }
    useEffect(() => {
        const loadDoctor = async () => {
          await getDoctorProfile(user.lastDoctor).then((result) =>{
              setDoctor(result);
          })
        }
        loadDoctor();
        return () => {

        };
  
    },[]);
    const mostrarAlerta=()=>{
        Swal.fire(
            '¡Feedback enviado con éxito!',
            'Gracias por su tiempo',
            'success'
          )
    }
    const [number,setNumber]=useState(0);
    const [hoverStar,setHoverStar]=useState(undefined);
    const handleText=()=>{
        switch(number){
            case 0:
                return 'Califique su experiencia con este doctor';
            case 1:
                return 'Muy mala';
            case 2:
                return 'Mala';
            case 3:
                return 'Normal';
            case 4:
                return 'Buena';
            case 5:
                return 'Excelente';
            default:
                return 'Califique su experiencia con este doctor'    
        }
    };
    const changeStars=(index)=>{
        setNumber(index+1)
        setFeedback({
            ...feedback,
            hoverStar: index+1
        })

    }

    const handlePlaceHolder=()=>{
        switch(number||hoverStar){
            case 0:
                return 'Escriba sus comentarios...';
            case 1:
            case 2:
                return '¿Cuáles fueron sus problemas en esta consulta?';
            case 3:
                return 'Escriba sus comentarios';
            case 4:
            case 5:
                return '¿Por qué te gustó este doctor?';
            default:
                return 'Escriba sus comentarios';          
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault()
        await updateDoctorFeedback(doctor,feedback).then(() => {
            console.log("éxito máximo") //TODO navigate to consults
         })
    }
    return (
        <div className="App">
            <div className="popup">
                <div className="content">
                    <div className="doctor">
                        <img className="doctorPhoto" 
                            style={{width:200,height:200,objectFit:"cover",borderRadius:45}} 
                            src="https://pbs.twimg.com/profile_images/1530563277/picoro_400x400.jpg" 
                            alt="name" 
                        />
                        <div className="caracter">
                            <h1>{doctor.displayName}</h1>
                            <h3>Especialidad: {doctor.specialty}</h3>
                        </div>
                    </div>
                    <div className="infoFeedback">
                        <form onSubmit={onSubmit}>
                                <div className="stars">
                                    <h1>{handleText()}</h1>
                                    {Array(5)
                                        .fill()
                                        .map((_, index)=>
                                            number >= index + 1 || hoverStar >= index + 1 ? (
                                                <AiFillStar 
                                                    onMouseOver={() => !number && setHoverStar(index + 1)}
                                                    onMouseLeave={() => setHoverStar(undefined)}
                                                    style={{color:'orange'}} 
                                                    onClick={() => changeStars(index)}
                                                />
                                            ):(
                                                <AiOutlineStar 
                                                    onMouseOver={() => !number && setHoverStar(index + 1)}
                                                    onMouseLeave={() => setHoverStar(undefined)}
                                                    style={{ color: "orange" }}
                                                    onClick={() => changeStars(index)}
                                                />
                                            )       
                                        )}
                                </div>
                                <textarea onChange={handleOnChange} name="comentario" placeholder={handlePlaceHolder()}></textarea>
                                <button type="submit" onClick={mostrarAlerta} className={` ${!number && "disabled"} `}>Enviar feedback</button>
                        </form>
                    </div>     
                </div>
            </div>
        </div>
    );
}
