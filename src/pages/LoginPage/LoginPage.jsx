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
                <div className="izquierda"></div>
                <div className="derecha">
                    
                    <form onSubmit={onSubmit}> 
                    <p className="tituloRegistro">Login</p>
                    <div>
                        <input placeholder="Ingrese su correo"  name="email" onChange={handleOnChange} className="input"/> 
                    </div>
                    <div>
                        <input placeholder="Ingrese su contraseña"  name="password" onChange={handleOnChange}/> 
                    </div>
                    <div>
                        <button  type="submit">Iniciar sesión</button>
                    </div>
                    <div>
                        <button onClick={handleLoginWithGoogle}>Iniciar con Google</button>
                    </div>
                    <div> 
                        <Link className="textolink" to={REGISTER_URL}>Registrate aqui</Link>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

