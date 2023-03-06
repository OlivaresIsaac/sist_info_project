export class User {

    // Prefered language, 1 español, 2 ingles, 3 portugues, 4 japones, 5 latin

    constructor(id, displayName, email, isDoctor, tlf, preferedLanguage){
        this.id = id
        this.displayName = displayName
        this.email = email
        this.isDoctor = isDoctor
        this.tlf = tlf
        this.preferedLanguage = preferedLanguage
    }

    toObject() {
        return {
            id: this.id,
            displayName: this.displayName,
            email: this.email,
            isDoctor: this.isDoctor,
            tlf: this.tlf,
            preferedLanguage: this.preferedLanguage
        }
    }
}