import { signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, getAdditionalUserInfo } from "@firebase/auth"
import { Doctor } from "../models/doctor"
import { User } from "../models/user"
import { auth, db, googleProvider } from "./config"
import { createDoctor, createUserProfile } from "./users-service"
import { runTransaction } from "firebase/firestore";


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

export const registerWithEmailAndPassword = async (email, password, displayName, allData) => {
    try {
    
        await runTransaction(db, async (transaction) => {
            const result = await createUserWithEmailAndPassword(auth, email, password)
      
            //TODO convertir en transacci'on
                    const newUser = new User(result.user.uid, displayName, email, allData.isDoctor, allData.tlf, allData.preferedLanguage)
            
                    await createUserProfile(result.user.uid, newUser.toObject())
            
                    if (newUser.isDoctor) {
                        const newDoctor = new Doctor(result.user.uid, allData.pricePerHour, allData.specialty, allData.biography)
                        await createDoctor(newDoctor.toObject())
                        console.log(newDoctor)
                    }
        })
        console.log("Transacción completa!")

        

    } catch (error) {
        console.log(error)
        console.log("Transacción fallida :(")
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