import { Egreso } from "./Egreso.interface";
import { FormaDePago } from "./FormaDePago";

export interface Pasivo {
    id? : string,
    mes : string,
    year : string,
    email : string,
    egresos? : Egreso[]
}