import { signInWithGoogle } from "../../firebase/auth-service"
import './LoginPage.css'
export function LoginPage() {

    const handleLoginWithGoogle = async () => {
       await signInWithGoogle()
    }

    return (
        <div>
            {/* TODO Hacerlo con form de html como en register */}
            <h1>Soy Login</h1>
            <input placeholder="Ingrese su correo"  className="input"/> 
            <input placeholder="Ingrese su contraseña" /> 
            <button onClick={console.log('inicio sesion correo')}>Iniciar sesión</button>
            <button onClick={handleLoginWithGoogle}>Iniciar con Google</button>
        </div>
    )
}

