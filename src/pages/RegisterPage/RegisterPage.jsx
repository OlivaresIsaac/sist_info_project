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

    const handleRegisterWithGoogle = async () => {
        await signInWithGoogle()
     }

    const onSubmit = async (event) => {
        event.preventDefault()
        console.log({formData})
        const {email, password, displayName} = formData

        //TODO pasar isDoctor del form
        await registerWithEmailAndPassword(email, password, displayName);
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
            {/* TODO SI SE REGISTRA CON GOOGLE VALIDAR QUE PONGA TODA LA INFO PARA CREAR EL PERFIL, o hacer un formulario que se haga
            despues de logearse con google */}
            <button onClick={handleRegisterWithGoogle}>Registrarse con Google</button>
        </form>
       
    </div>
    )
}

