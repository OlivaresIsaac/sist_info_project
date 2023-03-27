import { useEffect, useState } from "react";
import { CheckoutPage } from "./CheckoutPage";
import { useUserContext } from '../../contexts/UserContext'
import { createConsult } from "../../firebase/consult-service"
import { createChat, updateUsersChats } from "../../firebase/chats-service";
//CheckOutController, se encarga de llamar los métodos de firebase para crear consultas y chats
export function CheckoutController() {
    const [consult, setConsult] = useState(null)
    const [doctorName, setDoctorName] = useState(null)
    const {user} = useUserContext()
    let canTrigger = true

    useEffect(() => {
        if (canTrigger && consult) {
         canTrigger = false
         createDocuments().then(() => {
            console.log("exito máximo") //TODO navigate to consults
         })
        }
      },
      [consult]
    );

    const createChatObject = () => {
        return {
            doctor: doctorName,
            id: null,
            lastMessage: null,
            messages: [],
            patient: user.displayName,
            isArchived: false,
            active: false
        }
    }

    const createDocuments = async () => {
        createChat(user.id, consult.doctorId, createChatObject())
        createConsult(consult)
        // updateUsersChats(user.id, consult.doctorId)
    }

   return (
    <>
    <CheckoutPage setConsult={setConsult} user={user} setDoctorName={setDoctorName}/>
    </> 
   )
}