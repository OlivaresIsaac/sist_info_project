import { useUserContext } from '../../contexts/UserContext'
import './ProfilePage.css'
import temp_pfp from '../../assets/temp_pfp.png'
import  {getDoctorProfile, setDoctor}  from '../../firebase/doctors-service.js'
import {updateProfilePic}   from '../../firebase/users-service.js'
import { useState, useEffect } from "react"
import { PencilIcon } from '@heroicons/react/24/solid'
import EditText from '../../components/EditText/EditText'
import { db } from '../../firebase/config'
import { doc, updateDoc } from 'firebase/firestore'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useLocation } from "react-router-dom";
import { DEFAULTPROFILE } from '../../constants/url'


//Muestra la información del usuario


export function ProfilePage({canEditPage}) {    
    // Informacion del usuario
   
    // const doctor = location.state ? location.state
    const location = useLocation();
    const user = location.state.user 
    const canEdit = location.state ? location.state.canEdit : canEditPage
    const imageUrl = user.profilePic ? user.profilePic : DEFAULTPROFILE
    
 
    
    //Informacion del doctor
    const [doctor, setDoctor] = useState(null);
   

    // Constantes para manejar cambio de imagen
    const [showButton, setShowButton] = useState(true);
    const [newValue, setNewValue] = useState(null);
    const [hoverStar,setHoverStar]=useState(undefined);

    
    const changeProfilePic = () => {
        setShowButton(false)
    }

    const handleImgSave = () => {
        setShowButton(true)
        updateProfilePic(user, newValue)
      
        // handleUserSave(newValue, "profilePic")
    }

    const handleInputChange = (event) => {
        setNewValue(event.target.files[0]);
        console.log(event.target.files)
    };


    // Constantes para manejar actualizacion de informacion
    const handleDocSave = (newValue, attribute) => {
        const doctorRef = doc(db, 'doctors', doctor.id);
        const userRef = doc(db, 'users', user.id)
        const updates = {};
        updates[attribute] = newValue;

        if (!isNaN(parseInt(newValue))){
            updateDoc(userRef, parseInt(newValue))
            updateDoc(doctorRef, parseInt(newValue))
        }
        else {
            updateDoc(userRef, updates)
            updateDoc(doctorRef, updates)
        }

    };
      
    const handleUserSave = (newValue, attribute) => {
        const userRef = doc(db, 'users', user.id)
        const updates = {};
        

        if (!isNaN(parseInt(newValue))){    
            updates[attribute] = parseInt(newValue);
            updateDoc(userRef, updates)
        }
        else {
            updates[attribute] = newValue;
            updateDoc(userRef, updates)
        }

      };

      
    

    // Obtener doctor de firebase
    useEffect(() => {
      const loadDoctor = async () => {
        await getDoctorProfile(user.id).then((result) =>{
            setDoctor(result);
        })
      }

    
      loadDoctor();
     

      return () => {
      
      };

    }, []);

    if (user.isDoctor === true & !doctor) {
        return <p>Loading...</p>;
      }


    // Estructura de la pagina
    if (user.isDoctor === true){
        return (
            <> 
            <div className='file'>
                <div className='doctorFile'>

                    <img src={imageUrl} className='pfp-doc' alt='pysdocs'/>
                    <div className='firstDoc-data'>
                        <h1 className='h1-tittle'>Dr.<EditText values={doctor.displayName} onSave={value => handleDocSave(value, "displayName")} type={1} canEdit={canEdit}/></h1>
                        <h1 className='h2-tittle'>Soy especialista en: <EditText values={doctor.specialty} onSave={value => handleDocSave(value, "specialty")} type={2} canEdit={canEdit}/></h1>
                        <h1 className='h3-tittle'>Calificación de los clientes:</h1>
                        <div className="stars">
                                    {Array(5)
                                        .fill()
                                        .map((_, index)=>
                                            doctor.avgScore >= index + 1 || hoverStar >= index + 1 ? (
                                                <AiFillStar 
                                                   
                                                    style={{color:'orange'}} 
                                                />
                                            ):(
                                                <AiOutlineStar 
                                            
                                                    style={{ color: "orange" }}
                                                />
                                            )       
                                        )}
                        </div>
                    </div>
                    <div className='secondDoc-data'>
                        <div className='docBtn'>
                            {canEdit && (
                                <>
                            {showButton ? (
                            <button onClick={changeProfilePic} className="pfpBtn1">Cambiar foto de perfil</button>
                            ) : (
                            <div className='submitImg'>
                                <input type="file" accept="image/*" className='pfpBtn1' onChange={handleInputChange}  
                        name="input-file"
                        label='File'/>
                                <button onClick={handleImgSave} className='submitBtn1'>Aceptar</button>
                            </div>
                            )}
                                </>
                            )}
                        
                        </div>
                        <div className='h7-tittle'>
                            <h1 className='h5-tittle'>Precio por hora:</h1> 
                            <h1 className='h6-tittle'><EditText values={doctor.pricePerHour} onSave={value => handleDocSave(value, "pricePerHour")} type={1} canEdit={canEdit}/></h1>
                        </div>
                        <div className='h7-tittle'>
                            <h1 className='h5-tittle'>Teléfono:</h1> 
                            <h1 className='h6-tittle'><EditText values={user.tlf} onSave={value => handleUserSave(value, "tlf")} type={1} canEdit={canEdit}/></h1>
                        </div>
                        <div className='h7-tittle'>
                            <h1 className='h5-tittle'>Correo:</h1> 
                            <h1 className='h12-tittle'>{user.email}</h1>
                        </div>
                    </div>
                    <div className='third-data'>
                        <h1 className='h8-tittle'>Biografía:</h1>
                        <h1 className='biography'><EditText values={doctor.biography} onSave={value => handleDocSave(value, "biography")} type={2} canEdit={canEdit}/></h1>
                    </div>                   
                </div>
            </div>

<h1 className='commentTitle'>Comentarios de usuarios</h1>
        {doctor.feedbacks.map((feedback) => {
              return (<div className='file'> 
              <div className='doctorFile'>
                <div className='feedbackContainer'> 
                <div className='nameFeedbackContainer'> 
                 <h1  className='h3-tittle'>{feedback.displayName} comentó</h1>
                 
                </div>
                <h1 className='h3-tittle'>{feedback.comentario}</h1>
                <div className='nameFeedbackContainer'> 
                {Array(5)
                                        .fill()
                                        .map((_, index)=>
                                        feedback.hoverStar >= index + 1 ? (
                                                <AiFillStar 
                                                   
                                                    style={{color:'orange'}} 
                                                />
                                            ):(
                                                <AiOutlineStar 
                                                
                                                    style={{ color: "orange" }}
                                                />
                                            )       
                                        )}
                                        </div>
                    </div>
                </div>
            </div>)
        })

        }
          
            </>
        )
    } else {
        return (

            <div className='file'>
                <div className='pacientFile'>
                        <img src={imageUrl} className='pfp-pacient' alt='pysdocs'/>  
                        <div className='firstUser-data'>
                          
                        {canEdit && (
                            <>
                            {showButton ? (
                            <button onClick={changeProfilePic} className="pfpBtn2">Cambiar foto de perfil</button>
                            ) : (
                            <div className='submitImg'>
                                <input type="file" accept="image/*" className='pfpBtn2' onChange={handleInputChange}/>
                                <button onClick={handleImgSave} className='submitBtn2'>Aceptar</button>
                            </div>
                            )}
                            </>
                        )}

                            



                            <div className='h9-tittle'>
                                <h1 className='h5-tittle'>Nombre:</h1> 
                                <h1 className='h12-tittle'><EditText values={user.displayName} onSave={value => handleUserSave(value, "displayName")} type={1} canEdit={canEdit}/></h1>
                            </div>
                            <div className='h9-tittle'>
                                <h1 className='h5-tittle'>Teléfono:</h1> 
                                <h1 className='h12-tittle'><EditText values={user.tlf} onSave={value => handleUserSave(value, "tlf")} type={1} canEdit={canEdit}/></h1>
                            </div>
                            <div className='h9-tittle'>
                                <h1 className='h5-tittle'>Correo:</h1> 
                                <h1 className='h12-tittle'>{user.email}</h1>
                            </div>
                        </div>
                    </div>            
                </div>
        )  
    }
}
