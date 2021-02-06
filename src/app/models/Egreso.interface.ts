import { Gasto } from "./Gasto.interface";

export interface Egreso {
    idEgreso? : string;
    concepto? : string;
    categoria : string;
    icon? : string,
    formaDepago : string;
    fecha : any;
    idPasivo?: number;
    email : string;
    gastos? : Gasto[];
    cuotas? : number;
    interes? : number;
    total? : number;
}