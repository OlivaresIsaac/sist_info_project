
//import React, { useState } from "react";
import "./FeedbackPage.css";
import {useState} from "react";
import {AiFillStar,AiOutlineStar} from "react-icons/ai";

export function FeedbackPage() {
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

    const handlePlaceHolder=()=>{
        switch(number||hoverStar){
            case 0:
                return 'Escriba sus comentarios...';
            case 1:
            case 2:
            case 3:
            case 4:
                return '¿Cuáles fueron tus prolemas en esta consulta?';
            case 5:
                return '¿Por qué te gustó este doctor?';
            default:
                return 'Escriba sus comentarios';
                        
        }
    };
    return (
        <div className="App">
            <div className="popup">
                <div className="content">
                    <div className="doctor">
                        <img 
                            style={{width:100,height:100,objectFit:"cover",borderRadius:45}} 
                            src="https://pbs.twimg.com/profile_images/1530563277/picoro_400x400.jpg" 
                            alt="name" 
                        />
                        <h1>Juanito De La Calzada</h1>
                        <h3>Su última consulta con este doctor fue 12/12/2023</h3>
                    </div>
                    <div>
                        <h1>{handleText()}</h1>
                        {Array(5)
                            .fill()
                            .map((_, index)=>
                                number >= index + 1 || hoverStar >= index + 1 ? (
                                    <AiFillStar 
                                        onMouseOver={() => !number && setHoverStar(index + 1)}
                                        onMouseLeave={() => setHoverStar(undefined)}
                                        style={{color:'orange'}} 
                                        onClick={() => setNumber(index + 1)}
                                    />
                                ):(
                                    <AiOutlineStar 
                                        onMouseOver={() => !number && setHoverStar(index + 1)}
                                        onMouseLeave={() => setHoverStar(undefined)}
                                        style={{ color: "orange" }}
                                        onClick={() => setNumber(index + 1)}
                                    />
                                )       
                            )}
                    </div>
                    <textarea placeholder={handlePlaceHolder()}></textarea>
                    <button className={` ${!number && "disabled"} `}>Enviar feedback</button>
                </div>
            </div>
        </div>
    );
}