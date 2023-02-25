import { signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, getAdditionalUserInfo } from "@firebase/auth"
import { auth, googleProvider } from "./config"
import { createUserProfile } from "./users-service"

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider)

        const { isNewUser } = getAdditionalUserInfo(result)

        //TODO pasar data con todo lo necesario, ahora solo hay emall y displayname
        if(isNewUser){
            await createUserProfile(result.user.uid, {
                email: result.user.email,
                displayName: result.user.displayName

            })
        }

    } catch (error) {
        console.log(error)
    }
}

export const registerWithEmailAndPassword = async (email, password, extraData) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        console.log(result)
//TODO pasar data con todo lo necesario, ahora solo hay emall, revisar que objeto es extradata
// ese es el que se guarda en firestore
        await createUserProfile(result.user.uid, {
            email,
            ...extraData
        })
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