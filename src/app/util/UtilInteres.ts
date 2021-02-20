export class UtilInteres {
    
    static getCuotasInteresFrances(total : number, cantCuotas : number, interes : number) : number[] {

        let cuotaBase = total/cantCuotas;
        let interesMensual = interes/(12*100);
        let cuotas : number[] = [];

        //calcular cuotas
        for (let i = 1; i <= cantCuotas; i++) {     
            let cuotaConInteres = cuotaBase * (1 + interesMensual * (i-1));
            cuotas.push(cuotaConInteres);        
        }

        return cuotas;
    }

    static getCuotas(total : number, cantCuotas : number, interes : number) : number[] {
        let cuotaBase = total/cantCuotas;
        let interesMensual = interes/(12*100);
        let cuotas : number[] = [];

        //calcular cuotas
        for (let i = 1; i <= cantCuotas; i++) {     
            let cuotaConInteres = cuotaBase * (1 + interesMensual * cantCuotas);
            cuotas.push(cuotaConInteres);        
        }

        return cuotas;
    }
}