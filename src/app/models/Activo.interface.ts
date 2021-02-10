import { Ingreso } from "./Ingreso.interface";

export interface Activo {
    id? : string,
    mes : string,
    year : string,
    email : string,
    ingresos? : Ingreso[]
}