import { Observable } from "rxjs";

export class HttpConsoleResponse {
    static printResponse (observable : Observable<any>,title : string) {
            observable.subscribe(
        res => console.log("HTTP response "+title, res),
        err => console.log("HTTP error", err)
        );
    }
}