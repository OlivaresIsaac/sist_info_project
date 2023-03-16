export class Doctor {

    // TODO demas atributos como feedback y foto de perfil

    constructor(id, pricePerHour, specialty, biography, preferedLanguage, displayName){
        this.id = id
        this.pricePerHour = pricePerHour
        this.specialty = specialty
        this.biography = biography
        this.displayName = displayName
        this.preferedLanguage = preferedLanguage

    }

    toObject() {
        return {
            id: this.id,
            pricePerHour: this.pricePerHour,
            specialty: this.specialty,
            biography: this.biography,
            preferedLanguage: this.preferedLanguage,
            displayName: this.displayName,
           
        }
    }
}