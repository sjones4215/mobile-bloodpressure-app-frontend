

export class Vitals {
    id: number
    systolic: number
    diastolic: number
    hr: number
    weight: number
    oxygen: number
    temp: number
    created_at: string
    past_date: string 


    getCreatedAtDate() {
        return new Date(this.created_at)
    }

    getPastDate() {
        return new Date(this.past_date)
    }
}
