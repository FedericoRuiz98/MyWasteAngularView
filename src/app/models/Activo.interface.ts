import { Ingreso } from "./Ingreso.interface";

export interface Activo {
    id? : string,
    nombre : string,
    mes : string,
    year : string,
    ingresos? : Ingreso[]
}