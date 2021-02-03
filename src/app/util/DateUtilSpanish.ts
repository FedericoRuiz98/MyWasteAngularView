import { tick } from "@angular/core/testing"

export class DateUtilSpanish {
    private static months : string[] = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre"
    ]

    static monthToString(month : number) : string {
        return this.months[month]
    }
}