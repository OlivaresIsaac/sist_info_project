import { useState } from "react"
import { useNavigate } from "react-router"
import { LANDING_URL } from "../../constants/url"
import { registerWithEmailAndPassword, signInWithGoogle } from "../../firebase/auth-service"
import './RegisterPage.css'

export function RegisterPage() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        displayName: "",
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

    const handleLoginWithGoogle = async () => {
        await signInWithGoogle()
     }



    const onSubmit = async (event) => {
        event.preventDefault()
        console.log({formData})
        const {email, password, ...extraData} = formData

        await registerWithEmailAndPassword(email, password, extraData);
        //TODO navigate after valid register
        navigate(LANDING_URL)
    }
 

    return (<div>
        <h1>Soy Register</h1>
        <form onSubmit={onSubmit}> 
            <input placeholder="Ingrese su nombre"  className="input"  name="displayName" onChange={handleOnChange}/> 
            <input placeholder="Ingrese su correo"  name="email" onChange={handleOnChange}/> 
            <input placeholder="Ingrese su contraseña"  name="password" onChange={handleOnChange}/> 
            <button type="submit"> Registrarse</button>
            <button onClick={handleLoginWithGoogle}>Registrarse con Google</button>
        </form>
       
    </div>
    )
}

