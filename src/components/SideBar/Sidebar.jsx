import { Link, NavLink } from 'react-router-dom'
import './Sidebar.css'
import psydocs from '../../assets/psydocs.png'
import { CHATS_URL, CONSULTS_URL, FEEDBACK_URL, LANDING_URL, LOGIN_URL, REGISTER_URL } from '../../constants/url'
import { useUserContext } from '../../contexts/UserContext'
import { logout } from '../../firebase/auth-service'

const Sidebar = () => {
    const {user} = useUserContext()
    const handleLogout = async () => {
        console.log("Saliendo...")
        await logout()
    }
    console.log(user)
    return (
        <div className="sidebar">
            <ul>
                <li className='image'>
                    <img src={psydocs}/>
                </li>
                {/* TODO formato bonito para usuario ya logeado */}
                {!!user && (
                    <p className='user-name'> {user.displayName}</p>
                )}
                {!user && (
                    <p> </p>
                )}
                
                
                <li>
                    <Link to={LANDING_URL} >Inicio</Link>
                </li>
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