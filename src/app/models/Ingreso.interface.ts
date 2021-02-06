import { TipoIngreso } from "./TipoIngreso.interface";

export interface Ingreso {
    id? : string,
    concepto? : string,
    monto : number,
    fecha : any,
    tipoIngreso : TipoIngreso
}