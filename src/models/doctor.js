export class Doctor {

    // TODO demas atributos como feedback y foto de perfil

    constructor(id, pricePerHour, specialty, biography){
        this.id = id
        this.pricePerHour = pricePerHour
        this.specialty = specialty
        this.biography = biography

    }

    toObject() {
        return {
            id: this.id,
            pricePerHour: this.pricePerHour,
            specialty: this.specialty,
            biography: this.biography,
        }
    }
}