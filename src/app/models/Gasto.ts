export class Gasto {
    idGasto : number = 0;
    idSubCategoria : number;
    subCategoria : string | undefined;
    subCategoriaNombre : string = "";
    idPasivo : number;
    monto : number;
    concepto : string;

    constructor(idSubCategoria : number, idPasivo : number,monto : number, concepto : string, subCategoria : string | undefined) {        
        this.idSubCategoria = idSubCategoria;
        this.idPasivo = idPasivo;
        this.monto = monto;
        this.concepto = concepto;
        this.subCategoria = subCategoria;
    }
}