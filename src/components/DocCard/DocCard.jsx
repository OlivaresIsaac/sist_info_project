import styles from "./DocCard.module.css";
import {AiFillStar,AiOutlineStar} from "react-icons/ai";
import { Link } from 'react-router-dom'
import { PROFILE_URL, DEFAULTPROFILE } from "../../constants/url";
import { useNavigate } from "react-router"
import { useEffect, useState } from "react";
import { getUserProfileById } from '../../firebase/users-service'

// Componente que retorna el contenido del molde de AbstractCard, dependiendo de la condición se mostrará DocCard o CitaCard.

//Nombre doctor, idioma, especialidad, precio
export default function DocCard({Info, user}) {
    // Prefered language, 1 español, 2 ingles, 3 portugues, 4 japones, 5 latin
const languages = ["Español", "Inglés", "Portugués", "Japonés", "Latín"] 
// const [user, setUser] = useState(null)
const navigate = useNavigate()
const profileRoute = "/profile/"+Info.id 
// const [imageUrl, setImageUrl] = useState(DEFAULTPROFILE);

// useEffect(() => {

//     const loadUser = async () => {
     
//           await getUserProfileById(Info.id).then((result) => {
//               setUser(result)
//               setImageUrl(user.profilePic ? user.profilePic : DEFAULTPROFILE)
//           })
      
//     }
//     loadUser();

   

//     return () => {
    
//     };

//   }, []);


const goToProfile = () => {
    navigate(profileRoute, {
        state: {
            user: user,
            canEdit: false
           }
    });
  };
    return (
        <div className={styles.DoccardContainer}>
            <div>
                <h1 className={styles.CardDoctorTop}>{Info.displayName}</h1>
            </div>
            <div className={styles.DocMidContainer}>
                <p className={styles.CardDoctorMid}>Idioma: {languages[Info.preferedLanguage-1]}</p>
            </div>
            <div className={styles.DocMidContainer}>
                <p className={styles.CardDoctorMid}>Especialidad: {Info.specialty}</p>
            </div>
            <div>
                <p className={styles.CardDoctorBottom}>Precio la hora: ${Info.pricePerHour}</p>
            </div>
            <div className="stars">
                                 
                                    {Array(5)
                                        .fill()
                                        .map((_, index)=>
                                            Info.avgScore >= index + 1  ? (
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
                {/* <Link to={PROFILE_URL} className={styles.goProfile} onClick={goToProfile}> Ver perfil</Link> */}
                <h1 className={styles.goProfile} onClick={goToProfile}> Ver perfil</h1>
        </div>
    );
}

