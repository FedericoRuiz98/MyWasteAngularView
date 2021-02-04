import { Egreso } from "./Egreso.interface";
import { FormaDePago } from "./FormaDePago.interface";

export interface Pasivo {
    id? : string,
    mes : string,
    year : string,
    email : string,
    egresos? : Egreso[]
}