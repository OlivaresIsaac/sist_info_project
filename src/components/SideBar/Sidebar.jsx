import { Link, NavLink } from 'react-router-dom'
import './Sidebar.css'
import psydocs from '../../assets/psydocs.png'
import { CHATS_URL, CONSULTS_URL, FEEDBACK_URL, LANDING_URL, LOGIN_URL, REGISTER_URL } from '../../constants/url'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li className='image'>
                    <img src={psydocs}/>
                </li>
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
                    <Link to={LANDING_URL}  >Salir</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar