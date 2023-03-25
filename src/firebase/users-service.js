import {setDoc, doc, query, collection, where, getDocs} from "firebase/firestore"
import {db} from "./config"


// Servicio que retorna la información acerca del usuario logueado en la web.




export async function createUserProfile(userId, userData) {
    return setDoc(doc(db,"users", userId), userData)
}

export async function createDoctor(doctor) {
    return setDoc(doc(db,"doctors", doctor.id), doctor)
}

export async function getUserProfile(email) {
    const userQuery = query(
        collection(db, 'users'),
        where("email", "==", email)
    )

    const results = await getDocs(userQuery);

    if (results.size > 0) {
        const users = results.docs.map(item => ({
            ...item.data(),
            id: item.id
        }))

        // OJO, no retorna objeto user, retorna objeto con la estructura de user
        return users[0]
    } else {
        return null
    }
}

export async function updateUserLastDoctor(user,doctorId){
    let userCopy=user
    userCopy.lastDoctor=doctorId
    return setDoc(doc(db,"users", userCopy.id), userCopy)
}