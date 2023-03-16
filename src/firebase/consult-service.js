import {setDoc, addDoc, collection, runTransaction} from "firebase/firestore"
import {db} from "./config"



export async function createConsult(consult) {

    try {
       
        await runTransaction(db, async (transaction) => {
           
            const ref = await await addDoc(collection(db, "consults"), consult)
            let aux = consult
            aux.id = ref.id
            await setDoc(ref, aux)
               
        })
    }catch {
        console.log("error")
    }

  
    //  let aux = consult
    // aux.consultId= ref.id
    // return setDoc(ref, aux) 
}
