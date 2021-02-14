import { Egreso } from "./Egreso.interface";
import { EgresoFijo } from "./EgresoFijo.interface";

export interface Pasivo {
    id? : string,
    mes : string,
    year : string,
    email : string,
    egresos? : Egreso[],
    egresosFijos? : EgresoFijo[]
}