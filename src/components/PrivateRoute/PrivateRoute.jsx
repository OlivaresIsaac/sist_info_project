import { Navigate } from "react-router";
import { LOGIN_URL } from "../../constants/url";
import { useUserContext } from "../../contexts/UserContext";

// Componente que no permite acceder a la página en la que se llame, si el usuario no está registrado.

export function PrivateRoute({children}) {
    const {user, isLoading} = useUserContext()

    if (isLoading) {
        return <h1>CARGANDO USUARIO...</h1>
    }

    if (!isLoading && !user) {
        return <Navigate to={LOGIN_URL}/>
    }

    return children
}