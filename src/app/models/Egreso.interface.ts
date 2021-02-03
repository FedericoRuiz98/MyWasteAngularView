import { Gasto } from "./Gasto.interface";

export interface Egreso {
    idEgreso? : string;
    concepto? : string;
    categoria : string;
    formaDepago : string;
    fecha : Date;
    idPasivo?: number;
    email : string;
    gastos? : Gasto[];
    cuotas? : number;
    interes? : number;
    total? : number;
}