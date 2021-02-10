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

    static localDate(date : string) {
        let varDate = new Date(date);
        let offset = varDate.getTimezoneOffset() * 60000;
        return new Date(varDate.getTime() + offset);
    }
}