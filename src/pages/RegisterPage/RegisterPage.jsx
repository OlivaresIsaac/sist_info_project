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
        <div className="contenedorRegistro">
        <div className="izquierda"></div>
        <div className="derecha">
        <form onSubmit={onSubmit}> 
            <p >Registro</p>
            <div>
                Seleccione un rol de usuario:   
                <select className="seleccionador">
                    <option>Paciente</option>
                    <option>Doctor</option>
                </select>
            </div>
            <div>
            <input placeholder="Ingrese su nombre"  className="input"  name="displayName" onChange={handleOnChange}/>
            </div> 
            <div>
            <input placeholder="Ingrese su correo"  name="email" onChange={handleOnChange}/> 
            </div> 
            <div>
            <input placeholder="Ingrese su contraseña"  name="password" onChange={handleOnChange}/> 
            </div>
            <div>
            <input placeholder="Ingrese su telefono"  name="tlf" onChange={handleOnChange}/> 
            </div> 
            <div>
                Seleccione idioma conveniente:   
                <select className="seleccionador">
                    <option>Español</option>
                    <option>English</option>
                    <option>Português</option>
                    <option>日本</option>
                    <option>Latinus</option>
                </select>
            </div>
            <div>
                <button type="submit"> Registrarse</button>
            </div>
            {/* TODO SI SE REGISTRA CON GOOGLE VALIDAR QUE PONGA TODA LA INFO PARA CREAR EL PERFIL, o hacer un formulario que se haga
            despues de logearse con google */}
            <div>
            <button onClick={handleRegisterWithGoogle}>Registrarse con Google</button>
            </div>
        </form>
        </div>
        </div>
    </div>
    )
}

