import {setDoc, collection, addDoc, runTransaction, doc, getDoc,query, where, getDocs} from "firebase/firestore"
import {db} from "./config"



export async function createChat(userid, doctorid, chat) {
   

    try {
       
        await runTransaction(db, async (transaction) => {
           
            const ref = await addDoc(collection(db, "chats"), chat)
            let aux = chat
            aux.id = ref.id
            await setDoc(ref, aux)
            
            await updateUsersChats(userid, doctorid, ref.id)
        })
    }catch {
        console.log("error")
    }
}

export async function updateUsersChats(userId, doctorId, chatId) {
    try {
        const idArray = []
        idArray.push(userId)
        idArray.push(doctorId)
        // const q = query(collection(db, "usersChats"));
            const q = query(collection(db, "usersChats"), where("id", "in", idArray));
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach(async (doc) => {
                // doc.data() is never undefined for query doc snapshots
              
                let aux = doc.data()
                
                aux.chatsID.push(chatId)
                console.log(aux)
                await setDoc(doc.ref, aux)

        
              });
            // let aux = chat
            // aux.id = ref.id
            // await setDoc(ref, aux)
               
        
    }catch {
        console.log("error")
    }
    
}

export async function createUserChats(userId) {
    const newChatObject = {
        chatsID: [],
        id: userId
    }
    return setDoc(doc(db,"usersChats", userId), newChatObject)
}
    
