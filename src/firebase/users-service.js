import {setDoc, doc, query, collection, where, getDocs} from "firebase/firestore"
import {db} from "./config"

export async function createUserProfile(userId, userData) {
    return setDoc(doc(db,"users", userId), userData)
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
        
        return users[0]
    } else {
        return null
    }
     
}