export class RouteInfo {
    path: string;
    title: string;
    icon : string;    

    constructor(path : string, title : string, icon : string) {
        this.path = path;
        this.title = title;
        this.icon = icon;
    }
}