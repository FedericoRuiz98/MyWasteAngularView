import { tick } from "@angular/core/testing"

export class DateUtilSpanish {
    private static months : string[] = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ]

    static monthToString(month : number) : string {
        return this.months[month]
    }
}