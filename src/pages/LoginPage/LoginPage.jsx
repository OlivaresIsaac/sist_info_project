import { loginWithEmailAndPassword, signInWithGoogle } from "../../firebase/auth-service"
import './LoginPage.css'
import { useState } from "react"
import { useNavigate } from "react-router"
import { LANDING_URL } from "../../constants/url"
import { REGISTER_URL } from "../../constants/url"
import { Link } from 'react-router-dom'



export function LoginPage() {

    const handleLoginWithGoogle = async () => {
       await signInWithGoogle()
    }

    
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleOnChange = (event) => {
        const {name, value} = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    
    const onSubmit = async (event) => {
        event.preventDefault()
        console.log({formData})
        const {email, password} = formData

        await loginWithEmailAndPassword(email, password);
        //TODO navigate after valid register
        navigate(LANDING_URL)
    }
 


    return (
        <div>
            <div className="contendorLogin">
                <div className="izquierdalogin"></div>
                <div className="derechalogin">
                    
                    <form onSubmit={onSubmit}> 
                    <p className="tituloRegistro">Login</p>
                    <div className="loginCuadro">
                        <input placeholder="Ingrese su correo"  name="email" onChange={handleOnChange} className="inputlogin"/> 
                    </div>
                    <div className="loginCuadro">
                        <input type={'password'} placeholder="Ingrese su contraseña"  name="password" onChange={handleOnChange} required minLength={6}/> 
                    </div>
                    <div className="loginCuadro">
                        <button  className="buttonLogin" type="submit">Iniciar sesión</button>
                    </div>
                    <div className="loginCuadro">
                        <button className="buttonLogin" onClick={handleLoginWithGoogle}>Iniciar con Google</button>
                    </div>
                    <div className="loginCuadro"> 
                        <Link className="textolink" to={REGISTER_URL}>Registrate aqui</Link>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

