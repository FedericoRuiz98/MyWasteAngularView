import { Observable } from "rxjs";

export class HttpConsoleResponse {
    static printResponse (observable : Observable<any>) {
            observable.subscribe(
        res => console.log("HTTP response", res),
        err => console.log("HTTP error", err)
        );
    }
}