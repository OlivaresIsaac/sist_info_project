import { Timestamp } from "firebase/firestore"

//Permite modelar el objeto Doctor que se guardará en la base de datos y facilita su manipulación
export class Doctor {

    // TODO demas atributos como feedback y foto de perfil

    constructor(id, pricePerHour, specialty, biography, preferedLanguage, displayName,feedbacks,avgScore, scheduleTaken){
        this.id = id
        this.pricePerHour = pricePerHour
        this.specialty = specialty
        this.biography = biography
        this.displayName = displayName
        this.preferedLanguage = preferedLanguage
        this.feedbacks=feedbacks
        this.avgScore=avgScore
        this.scheduleTaken=scheduleTaken
    }

    toObject() {
        return {
            id: this.id,
            pricePerHour: this.pricePerHour,
            specialty: this.specialty,
            biography: this.biography,
            preferedLanguage: this.preferedLanguage,
            displayName: this.displayName,
            feedbacks: this.feedbacks,
            avgScore:this.avgScore,
            scheduleTaken: this.scheduleTaken
        }
    }
}