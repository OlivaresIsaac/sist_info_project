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
        password: "",
        tlf: "",
        isDoctor:"",
        preferedLanguage:""
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
        // console.log({formData})
        const {email, password, displayName} = formData
        let aux = formData
        aux.isDoctor = (formData.isDoctor === "true")
        aux.preferedLanguage = (formData.preferedLanguage === "") ? 1 : parseInt(formData.preferedLanguage)

        console.log(aux)
        
        //TODO pasar isDoctor del form
        await registerWithEmailAndPassword(email, password, displayName, aux);
        //TODO navigate after valid register
        navigate(LANDING_URL)
    }
 

    return (<div>
        <div className="contenedorRegistro">
        <div className="izquierda"></div>
        <div className="derecha">
        <form onSubmit={onSubmit}>
            <p className="tituloRegistro">Registro</p> 
            <div>
                Seleccione un rol de usuario:   
                <select className="seleccionador" name="isDoctor" onChange={handleOnChange} required>
                    <option value={false}>Paciente</option>
                    <option value={true} >Doctor</option>
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
                <select className="seleccionador" name="preferedLanguage" onChange={handleOnChange}>
                    <option value={1}>Español</option>
                    <option value={2}>English</option>
                    <option value={3}>Português</option>
                    <option value={4}>日本</option>
                    <option value={5}>Latinus</option>
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

