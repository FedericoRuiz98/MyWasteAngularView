import { Gasto } from "./Gasto.interface";

export interface EgresoFijo {
    idEgresoFijo? : string;
    concepto? : string;
    categoria : string;    
    formaDepago : string;
    fecha : any;
    createDate : any;        
    cuotas? : number;
    interes? : number;
    monto? : number;
}