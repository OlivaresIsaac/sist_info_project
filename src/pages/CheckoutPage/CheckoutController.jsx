import { useEffect, useState } from "react";
import { CheckoutPage } from "./CheckoutPage";
import { useUserContext } from '../../contexts/UserContext'
import { createConsult } from "../../firebase/consult-service"
 
export function CheckoutController() {
    const [consult, setConsult] = useState(null)
    const {user} = useUserContext()
    let canTrigger = true

    useEffect(() => {
        if (canTrigger && consult) {
         console.log(consult)
         canTrigger = false
         createConsult(consult).then(() => {
            console.log("exito máximo") //TODO navigate to consults
         })
        }
      },
      [consult]
    );

   return (
    <>
    <CheckoutPage setConsult={setConsult} user={user}/>
    </> 
   )
}