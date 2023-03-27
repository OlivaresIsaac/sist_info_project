import {setDoc, doc, query, collection, where, getDocs} from "firebase/firestore"
import {db} from "./config"
export async function updateDoctorFeedback(doctor,feedback){
    let doctorCopy=doctor
    doctorCopy.feedbacks.push(feedback)
    
    let suma=0;
    for (let i = 0; i < doctorCopy.feedbacks.length; i++) {
        suma += doctorCopy.feedbacks[i].hoverStar;
    }
    const promedio = Math.round(suma / doctorCopy.feedbacks.length);
    doctorCopy.avgScore=promedio
    return setDoc(doc(db,"doctors", doctorCopy.id), doctorCopy)
}