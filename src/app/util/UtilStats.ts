import { GastoPorCategoria } from "../models/stadistics/gastoPorCategoria.interface";

export class UtilStats {
    public static getPorcentaje(total : number, porcion : number) : number {
        return porcion/total * 100;
    }

    public static promedioPorCategoria(dataset : any[]) {   
        let TotalCategorias : GastoPorCategoria[] = [];  

        dataset.forEach(e => {

            let exist = false;

            //verifico si ya esta
            if(TotalCategorias.length) {
            TotalCategorias.forEach(tc => {
                if(tc.categoria == e.categoria) {
                tc.gasto += e.monto! || e.total;
                exist = true;
                }
            })
            }

            if(!exist) {
            let gastoPorCategoria : GastoPorCategoria = {
                categoria: e.categoria,
                gasto: e.monto! || e.total
            }
            TotalCategorias.push(gastoPorCategoria);
            }
        })
        
        //porcentajes
        TotalCategorias.forEach(tc => {
            tc.porcentaje = tc.gasto/this.getTotal(dataset);
        });
        
        return TotalCategorias;
    }
    
    private static getTotal(dataset : any[]) {
        let total = 0;
        dataset.forEach(e => {
            total += e.monto! || e.total;
        });

        return total
    }
}