import { useUserContext } from '../../contexts/UserContext'
import './ProfilePage.css'
import temp_pfp from '../../assets/temp_pfp.png'
import  {getDoctorProfile, setDoctor}  from '../../firebase/doctors-service.js'
import { useState, useEffect } from "react"
import { PencilIcon } from '@heroicons/react/24/solid'
import EditText from '../../components/EditText/EditText'
import { db } from '../../firebase/config'
import { doc, updateDoc } from 'firebase/firestore'


//Muestra la información del usuario


export function ProfilePage() {    
    // Informacion del usuario
    const {user} = useUserContext();

    //Informacion del doctor
    const [doctor, setDoctor] = useState(null);
    
    // Constantes para manejar cambio de imagen
    const [showButton, setShowButton] = useState(true);
    const [newValue, setNewValue] = useState(null);

    const changeProfilePic = () => {
        setShowButton(false)
    }

    const handleImgSave = () => {
        setShowButton(true)
        // handleUserSave(newValue, "profilePic")
    }

    const handleInputChange = (event) => {
        setNewValue(event.target.value);
    };


    // Constantes para manejar actualizacion de informacion
    const handleDocSave = (newValue, attribute) => {
        const doctorRef = doc(db, 'doctors', doctor.id);
        const userRef = doc(db, 'users', user.id)
        const updates = {};
        updates[attribute] = newValue;

        updateDoc(userRef, updates)
        updateDoc(doctorRef, updates)
    };
      
    const handleUserSave = (newValue, attribute) => {
        const userRef = doc(db, 'users', user.id)
        const updates = {};
        updates[attribute] = newValue;

        updateDoc(userRef, updates)
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
            <div className='file'>
                <div className='doctorFile'>
                    <img src={temp_pfp} className='pfp-doc' alt='pysdocs'/>
                    <div className='firstDoc-data'>
                        <h1 className='h1-tittle'>Dr.<EditText values={doctor.displayName} onSave={value => handleDocSave(value, "displayName")} type={1}/></h1>
                        <h1 className='h2-tittle'>Soy especialista en: <EditText values={doctor.specialty} onSave={value => handleDocSave(value, "specialty")} type={2}/></h1>
                        <h1 className='h3-tittle'>Calificación de los clientes:</h1>
                        <h1 className='h3-tittle'>*calificación*</h1>
                    </div>
                    <div className='secondDoc-data'>
                        <div className='docBtn'>
                        {showButton ? (
                            <button onClick={changeProfilePic} className="pfpBtn1">Cambiar foto de perfil</button>
                            ) : (
                            <div className='submitImg'>
                                <input type="file" accept="image/*" className='pfpBtn1' onChange={handleInputChange}/>
                                <button onClick={handleImgSave} className='submitBtn1'>Aceptar</button>
                            </div>
                            )}
                        </div>
                        <div className='h7-tittle'>
                            <h1 className='h5-tittle'>Precio por hora:</h1> 
                            <h1 className='h6-tittle'><EditText values={doctor.pricePerHour} onSave={value => handleDocSave(value, "pricePerHour")} type={1}/></h1>
                        </div>
                        <div className='h7-tittle'>
                            <h1 className='h5-tittle'>Teléfono:</h1> 
                            <h1 className='h6-tittle'><EditText values={user.tlf} onSave={value => handleUserSave(value, "tlf")} type={1}/></h1>
                        </div>
                        <div className='h7-tittle'>
                            <h1 className='h5-tittle'>Correo:</h1> 
                            <h1 className='h12-tittle'>{user.email}</h1>
                        </div>
                    </div>
                    <div className='third-data'>
                        <h1 className='h8-tittle'>Biografía:</h1>
                        <h1 className='biography'><EditText values={doctor.biography} onSave={value => handleDocSave(value, "biography")} type={2}/></h1>
                    </div>                   
                </div>
            </div>
        )
    } else {
        return (

            <div className='file'>
                <div className='pacientFile'>
                        <img src={temp_pfp} className='pfp-pacient' alt='pysdocs'/>  
                        <div className='firstUser-data'>

                            {showButton ? (
                            <button onClick={changeProfilePic} className="pfpBtn2">Cambiar foto de perfil</button>
                            ) : (
                            <div className='submitImg'>
                                <input type="file" accept="image/*" className='pfpBtn2' onChange={handleInputChange}/>
                                <button onClick={handleImgSave} className='submitBtn2'>Aceptar</button>
                            </div>
                            )}



                            <div className='h9-tittle'>
                                <h1 className='h5-tittle'>Nombre:</h1> 
                                <h1 className='h12-tittle'><EditText values={user.displayName} onSave={value => handleUserSave(value, "displayName")} type={1}/></h1>
                            </div>
                            <div className='h9-tittle'>
                                <h1 className='h5-tittle'>Teléfono:</h1> 
                                <h1 className='h12-tittle'><EditText values={user.tlf} onSave={value => handleUserSave(value, "tlf")} type={1}/></h1>
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
