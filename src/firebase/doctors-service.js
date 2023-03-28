
import {setDoc, runTransaction, collection, query, getDocs, getDoc, where, doc, updateDoc} from "firebase/firestore"
import {db} from "./config"




// Servicio que retorna la información acerca del doctor logueado en la web.



export async function getDoctors() {
    
        const doctorArray = []
           
            const doctorsQuery = query(collection(db, "doctors"))
            const querySnapshot = await getDocs(doctorsQuery)
            // onSnapshot(doctorsQuery, (snapshot) => {
               
            //     snapshot.forEach((doc, i) => {
            //         doctorArray[i] = doc.data()
                   
            //     });
            //  })

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                doctorArray.push(doc.data())
             
              });

        
             return doctorArray

            //  onSnapshot(queryChats, (snapshot) => {
            //     let chats = [];
            //     snapshot.forEach((doc) => {
            //         chats = doc.data().chatsID;
            //     });
            //     setUserChats(chats);
            //     getChatsDoc()
            // });
       
 
}

export async function getDoctorProfile(userId) {
  const userQuery = query(
      collection(db, 'doctors'),
      where("id", "==", userId)
  )

  const results = await getDocs(userQuery);

  if (results.size > 0) {
      const doctors = results.docs.map(item => ({
          ...item.data(),
          id: item.id
      }))

      // OJO, no retorna objeto user, retorna objeto con la estructura de user
      return doctors[0]
  } else {
      return null
  }
}

export async function setDoctorSchedules(doctor, schedules){
    let doctorCopy=doctor
    const doctorRef = doc(db, 'doctors', doctor.id)

    schedules.forEach((schedule) => {
        doctorCopy.scheduleTaken.push(schedule)
    })
    
    return setDoc(doctorRef, doctorCopy)
}

