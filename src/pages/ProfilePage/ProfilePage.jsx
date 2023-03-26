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
    const {user} = useUserContext();

    const [userInfo, setUserInfo] = useState(user);
    const [doctor, setDoctor] = useState(null);
    



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

    if (!doctor) {
        return <p>Loading...</p>;
      }

    if (user.isDoctor === true){
        return (
            <div className='file'>
                <div className='doctor'>
                    <img src={temp_pfp} className='pfp-doc' alt='pysdocs'/>
                    <div className='first-data'>
                        <h1 className='h1-tittle'>Dr.<EditText values={doctor.displayName} onSave={value => handleDocSave(value, "displayName")}/></h1>
                        <h1 className='h2-tittle'>Soy especialista en: <EditText values={doctor.specialty} onSave={value => handleDocSave(value, "specialty")}/></h1>
                        <h1 className='h3-tittle'>Calificación de los clientes:</h1>
                        <h1 className='h3-tittle'>*calificación*</h1>
                    </div>
                        <h1 className='h4-tittle'>Cambiar foto de perfil</h1>    
                    <div className='second-data'>
                        <div className='h7-tittle'>
                            <h1 className='h5-tittle'>Precio por hora:</h1> 
                            <h1 className='h6-tittle'><EditText values={doctor.pricePerHour} onSave={value => handleDocSave(value, "pricePerHour")}/></h1>
                        </div>
                        <div className='h7-tittle'>
                            <h1 className='h5-tittle'>Edad:</h1> 
                            <h1 className='h6-tittle'>*edad*</h1>
                        </div>
                    </div>
                    <div className='third-data'>
                        <h1 className='h8-tittle'>Biografía:</h1>
                        <h1 className='biography'>{doctor.biography}</h1>
                    </div>                   
                </div>
            </div>
        )
    } else {
        return (

            <div className='file'>
                <div className='pacient'>
                    <img src={temp_pfp} className='pfp-pacient' alt='pysdocs'/>
                    <h1 className='h9-tittle'>Cambiar foto de perfil</h1>    
                        <div className='h10-tittle'>
                            <h1 className='h11-tittle'>{user.displayName}</h1>
                            <h1 className='h11-tittle'>{user.tlf}</h1>
                            <h1 className='h11-tittle'>{user.email}</h1>
                            <h1 className='h11-tittle'>{user.age}</h1>
                        </div>
                    </div>            
                </div>
        )  
    }
}
