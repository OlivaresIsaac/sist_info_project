export class Consult {


    constructor(consultId, doctorId, patientId, date, hour, payedAmount){
        this.consultId = consultId
        this.doctorId = doctorId
        this.patientId = patientId
        this.hour = hour
        this.date = date
        this.payedAmount = payedAmount

    }

    toObject() {
        return {
            consultId: this.consultId,
            doctorId: this.doctorId,
            hour: this.hour,
            date: this.date,
            payedAmount: this.payedAmount
        }
    }
}