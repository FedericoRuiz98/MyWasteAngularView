export class Gasto {
    idGasto : number;
    idSubCategoria : number;
    idPasivo : number;
    monto : number;
    concepto : string;

    constructor(idGasto : number, idSubCategoria : number, idPasivo : number,monto : number, concepto : string) {
        this.idGasto = idGasto;
        this.idSubCategoria = idSubCategoria;
        this.idPasivo = idPasivo;
        this.monto = monto;
        this.concepto = concepto;
    }
}