import { Link } from 'react-router-dom'
import './Sidebar.css'
import psydocs from '../../assets/psydocs.png'
import { CHATS_URL, CONSULTS_URL, FEEDBACK_URL, LANDING_URL, LOGIN_URL, REGISTER_URL } from '../../constants/url'
import { useUserContext } from '../../contexts/UserContext'
import { logout } from '../../firebase/auth-service'

const Sidebar = () => {
    const {user} = useUserContext()
    const handleLogout = async () => {
        //console.log("Saliendo...")
        await logout()
    }

    const openMenu = () => {
        const div = document.getElementById('burgerMenu');
        const sideBar = document.getElementById('sidebar')
        const body = document.getElementById("sidebar").parentElement.childNodes[1]
        console.log(body)
        body.classList.toggle("change")
        div.classList.toggle("change")
        sideBar.classList.toggle("change")
    }
    //console.log(user)


    const profileRoute = (!!user) ? "/profile/"+user.id : LANDING_URL
    //console.log(profileRoute)
    return (
        <div className="sidebar" id="sidebar">
            <ul className='sidebar-ul'>
                <div className='image'>
                   
                    <Link to={LANDING_URL} >
                    <img src={psydocs} alt="Psydocs" /> 
                    </Link>
                  
               </div>
                {/* TODO formato bonito para usuario ya logeado */}
                {!!user && (
                    <div className='sidebar-li'> 
                    <Link to={profileRoute} className="user_name "> {user.displayName}</Link>
                   </div>
                )}
                {!user && (
                    <p> </p>
                )}
                 
                
                {/* <li>
                    <Link to={LANDING_URL} >Inicio</Link>
               </div> */}
                <div className='sidebar-li'>
                    <Link to={CHATS_URL} >Chats</Link>
               </div>
                <div className='sidebar-li'>
                    <Link to={CONSULTS_URL}  >Consultas</Link>
               </div>
                <div className='sidebar-li'>
                    <Link to={FEEDBACK_URL}  >Feedback</Link>
               </div>
                <div className='sidebar-li'>
                    <Link to={LOGIN_URL}  >Login</Link>
               </div>
                <div className='last sidebar-li'>
                    <Link to={REGISTER_URL}  >Registrarse</Link>
               </div>
                <div className='logout sidebar-li'>
            
                    <Link to={LANDING_URL}  onClick={handleLogout}>Salir</Link>
               </div>
           
               <div className="menu-container" onClick={openMenu} id="burgerMenu">
                    <div className="bar1"></div>
                   
                    <span className="bar2"></span>
                    <div className="bar3"></div>
               </div>
            </ul>
        </div>
    )
}

export default Sidebar