import { loginWithEmailAndPassword, signInWithGoogle } from "../../firebase/auth-service"
import './LoginPage.css'
import { useState } from "react"
import { useNavigate } from "react-router"
import { LANDING_URL } from "../../constants/url"


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
            <form onSubmit={onSubmit}> 
            <h1>Soy Login</h1>
            <input placeholder="Ingrese su correo"  name="email" onChange={handleOnChange} className="input"/> 
            <input placeholder="Ingrese su contraseña"  name="password" onChange={handleOnChange}/> 
            <button  type="submit">Iniciar sesión</button>
            <button onClick={handleLoginWithGoogle}>Iniciar con Google</button>
            </form>
       
        </div>
    )
}

