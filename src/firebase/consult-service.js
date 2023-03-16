import {setDoc, addDoc, collection} from "firebase/firestore"
import {db} from "./config"



export async function createConsult(consult) {
    return await addDoc(collection(db, "consults"), consult)
    //  let aux = consult
    // aux.consultId= ref.id
    // return setDoc(ref, aux) 
}
