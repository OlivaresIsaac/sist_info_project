import {setDoc, addDoc, collection, runTransaction, query, where, getDocs, doc} from "firebase/firestore"
import {db} from "./config"


// Servicio que crea las consultas


export async function createConsult(consult) {

    try {
       
        await runTransaction(db, async (transaction) => {
           
            const ref = await addDoc(collection(db, "consults"), consult)
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


export async function getConsultsById(isDoctor, userId){
    const consultArray = []
    let consultQuery;
    if (isDoctor) {
        consultQuery = query(collection(db, "consults"), where("doctorId", "==", userId))
    } else {
        consultQuery = query(collection(db, "consults"), where("patientId", "==", userId))
    }
   
    const querySnapshot = await getDocs(consultQuery)
 
    querySnapshot.forEach((doc) => {
        
        consultArray.push(doc.data())
     
      });


     return consultArray
}
export async function updateUserConsulta(consulta){
    let consultaCopy=consulta
    consultaCopy.status="cancelada"
    
    setDoc(doc(db,"consults", consultaCopy.id), consultaCopy)
}
