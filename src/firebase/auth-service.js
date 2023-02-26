import { signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, getAdditionalUserInfo } from "@firebase/auth"
import { User } from "../models/user"
import { auth, googleProvider } from "./config"
import { createUserProfile } from "./users-service"

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
        }

    } catch (error) {
        console.log(error)
    }
}

export const registerWithEmailAndPassword = async (email, password, displayName) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password)
      
//TODO pasar data con todo lo necesario,
        const newUser = new User(result.user.uid, displayName, email, false)

        await createUserProfile(result.user.uid, newUser.toObject())
    } catch (error) {
        console.log(error)
        // TODO anuncio de usuario invalido porque ya existe
    }
}

export const loginWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
    }
}

export const logout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.log(error)
    }
}