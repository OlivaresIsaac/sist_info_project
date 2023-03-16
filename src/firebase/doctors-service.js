import {setDoc, runTransaction, collection, query, onSnapshot, getDocs} from "firebase/firestore"
import {db} from "./config"



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

