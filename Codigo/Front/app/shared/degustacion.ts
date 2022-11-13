export class Degustacion {
    name: string;
    description?: string;
    picture?: string;
    foodType: string;
    country: string;
    taste: string;
    rating?: number;
    date?: Date;
    addedBy: string;
    local: string;

    constructor() {
        this.name = '';
        this.foodType = '';
        this.country = '';
        this.taste = '';
        this.addedBy = '';
        this.local = '';
    }
}