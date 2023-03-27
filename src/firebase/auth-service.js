import { signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, getAdditionalUserInfo } from "@firebase/auth"
import { Doctor } from "../models/doctor"
import { User } from "../models/user"
import { auth, db, googleProvider } from "./config"
import { createDoctor, createUserProfile } from "./users-service"
import { runTransaction } from "firebase/firestore";
import { createUserChats} from "./chats-service"

// Servicio de autentificación de registro y login.


//TODO Hacer form que pase los parámetros aqui a esta función para hacer el createUser
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider)
        console.log(result)
        const { isNewUser } = getAdditionalUserInfo(result)

        //TODO pasar data con todo lo necesario, buscar la forma de pasar el boolean de isDoctor
        if(isNewUser){
            const newUser = new User(result.user.uid, result.user.displayName, result.user.email, false)

            await createUserProfile(result.user.uid, newUser.toObject())
            // await createUserChats(result.user.uid)
        }

    } catch (error) {
        console.log(error)
    }
}

// Registro a partir de un correo electrónico y contraseña
export const registerWithEmailAndPassword = async (email, password, displayName, allData) => {
    try {
    
        await runTransaction(db, async (transaction) => {
            const result = await createUserWithEmailAndPassword(auth, email, password)
      
           
                    const newUser = new User(result.user.uid, displayName, email, allData.isDoctor, allData.tlf, allData.preferedLanguage, allData.userChats)
                    
                    await createUserProfile(result.user.uid, newUser.toObject())
                    // await createUserChats(result.user.uid)
            
                    if (newUser.isDoctor) {
                        const newDoctor = new Doctor(result.user.uid, allData.pricePerHour, allData.specialty, allData.biography, allData.preferedLanguage, allData.displayName )
                        await createDoctor(newDoctor.toObject())
                        console.log(newDoctor)
                    }
        })
        console.log("Transacción completa!")

        

    } catch (error) {
        console.log(error)
        if (error.code === "auth/email-already-in-use") {
            alert("Alerta, usuario ya existe")
          } else {
            alert("Alerta, error al momento del registro, intente de nuevo")
          }
    }
}

// Login a partir de correo electrónico y contraseña.
export const loginWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        if (error.code === "auth/wrong-password") {
            alert("Contraseña incorrecta");
        } else if (error.code === "auth/user-not-found") {
            alert("Usuario inexistente");
        } else {
            alert ("Ha ocurrido un error inesperado")
        }
    }
}


// Logout del usuario actualmente logueado.
export const logout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.log(error)
    }
}
