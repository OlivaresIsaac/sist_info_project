import { Link } from 'react-router-dom'
import './Sidebar.css'
import psydocs from '../../assets/psydocs.png'
import { CHATS_URL, CONSULTS_URL, FEEDBACK_URL, LANDING_URL, LOGIN_URL, PROFILE_URL, REGISTER_URL } from '../../constants/url'
import { useUserContext } from '../../contexts/UserContext'
import { logout } from '../../firebase/auth-service'

const Sidebar = () => {
    const {user} = useUserContext()
    const handleLogout = async () => {
        //console.log("Saliendo...")
        await logout()
    }
    //console.log(user)


    const profileRoute = (!!user) ? "/profile/"+user.id : LANDING_URL
    //console.log(profileRoute)
    return (
        <div className="sidebar">
            <ul>
                <li className='image'>
                   
                    <Link to={LANDING_URL} >
                    <img src={psydocs}/> 
                    </Link>
                  
                </li>
                {/* TODO formato bonito para usuario ya logeado */}
                {!!user && (
                    <li> 
                    <Link to={profileRoute} className="user_name "> {user.displayName}</Link>
                    </li>
                )}
                {!user && (
                    <p> </p>
                )}
                 
                
                {/* <li>
                    <Link to={LANDING_URL} >Inicio</Link>
                </li> */}
                <li>
                    <Link to={CHATS_URL} >Chats</Link>
                </li>
                <li>
                    <Link to={CONSULTS_URL}  >Consultas</Link>
                </li>
                <li>
                    <Link to={FEEDBACK_URL}  >Feedback</Link>
                </li>
                <li>
                    <Link to={LOGIN_URL}  >Login</Link>
                </li>
                <li className='last'>
                    <Link to={REGISTER_URL}  >Registrarse</Link>
                </li>
                <li className='logout'>
                {/* TODO logout url or functionality*/}
                    <Link to={LANDING_URL}  onClick={handleLogout}>Salir</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar