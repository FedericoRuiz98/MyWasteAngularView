export class Pasivo {
    idPasivo : number = 0;
    idFormaDePago : number;
    idCategoria : number;
    idEgreso : number;
    fecha : Date;
    total : number = 0;
    cuotas : number = 0;

    constructor(idFormaDePago : number,idCategoria : number,idEgreso : number,fecha : Date) {
        this.idCategoria = idCategoria;
        this.idFormaDePago = idFormaDePago;
        this.idEgreso = idEgreso;
        this.fecha = fecha;
    }
}