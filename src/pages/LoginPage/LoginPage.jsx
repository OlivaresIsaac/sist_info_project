import { signInWithGoogle } from "../../firebase/auth-service"

export function LoginPage() {

    const handleLoginWithGoogle = async () => {
       await signInWithGoogle()
    }

    return (
        <div>
            <h1>Soy Login</h1>
            <input placeholder="Ingrese su correo" /> 
            <input placeholder="Ingrese su contraseña" /> 
            <button onClick={handleLoginWithGoogle}>Iniciar sesión</button>
        </div>
    )
}

