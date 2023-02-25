import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import psydocs from 'C:/Users/Andrés Castro/Documents/GitHub/sist_info_project/src/assets/psydocs.png'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li className='image'>
                    <img src={psydocs}/>
                </li>
                <li>
                    <NavLink to="/" >Inicio</NavLink>
                </li>
                <li>
                    <NavLink to="/chats" >Chats</NavLink>
                </li>
                <li>
                    <NavLink to="/consults" >Consultas</NavLink>
                </li>
                <li>
                    <NavLink to="/feedback" >Feedback</NavLink>
                </li>
                <li>
                    <NavLink to="/login" >Login</NavLink>
                </li>
                <li className='last'>
                    <NavLink to="/register" >Registrarse</NavLink>
                </li>
                <li className='logout'>
                    <NavLink to="" >Salir</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar