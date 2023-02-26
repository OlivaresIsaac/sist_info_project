export class User {
    constructor(id, displayName, email, isDoctor){
        this.id = id
        this.displayName = displayName
        this.email = email
        this.isDoctor = isDoctor
    }

    toObject() {
        return {
            id: this.id,
            displayName: this.displayName,
            email: this.email,
            isDoctor: this.isDoctor
        }
    }
}