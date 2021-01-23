export class UtilStats {
    public static getPorcentaje(total : number, porcion : number) : number {
        return porcion/total * 100;
    }
}