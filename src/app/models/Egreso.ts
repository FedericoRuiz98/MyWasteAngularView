export class Egreso {
    idEgreso : number = 0;
    year : string;
    mes : string;
    total : number = 0;
    email : string;

    constructor(email : string,mes : string, year : string) {
        this.email = email;
        this.year = year;
        this.mes = mes;
    }
}