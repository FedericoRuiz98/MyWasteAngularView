export class RouteInfo {
    path: string;
    title: string;  
    icon : string
    routes? : boolean; 

    constructor(path : string, title : string, icon : string, routes? : boolean) {
        this.path = path;
        this.title = title;
        this.icon = icon;
        this.routes = routes;
    }
}