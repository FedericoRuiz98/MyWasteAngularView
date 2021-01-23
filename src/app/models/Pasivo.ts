import { FormaDePago } from "./FormaDePago";

export class Pasivo {
    idPasivo : number = 0;
    idFormaDePago : number;    
    idEgreso : number;
    fecha : Date;
    total : number = 0;
    cuotas : number = 0;
    idCategoria : number;
    categoria : string = "";
    categoriaIcon : string = "";

    constructor(idFormaDePago : number,idCategoria : number,idEgreso : number,fecha : Date) {
        this.idCategoria = idCategoria;
        this.idFormaDePago = idFormaDePago;
        this.idEgreso = idEgreso;
        this.fecha = fecha;
    }
}