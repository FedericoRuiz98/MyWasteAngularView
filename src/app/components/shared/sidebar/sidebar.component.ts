import { Component, Input, OnInit } from '@angular/core';
import { RouteInfo } from 'src/app/models/Routes/RouteInfo';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  RoutesHome : RouteInfo[] = [new RouteInfo("/home","Home","fas fa-donate")];
  RoutesEgreosos : RouteInfo[] = [
    new RouteInfo("/gastos","Costos Variables","fas fa-donate"),
    new RouteInfo("/gastos","Costos Fijos","fas fa-donate")
  ];
  RoutesIngresos : RouteInfo[] = [new RouteInfo("/egresos","Ingresos","fas fa-donate")];
  RoutesEtiquetas : RouteInfo[] = [
    new RouteInfo("/egresos","Categorias","fas fa-donate"),
    new RouteInfo("/egresos","Sub Categorias","fas fa-donate")
  ];
  RoutesEstadisticas : RouteInfo[] = [
    new RouteInfo("/egresos","Consumo","fas fa-chart-line"),
    new RouteInfo("/egresos","Balance","fas fa-chart-pie")
  ];
  RoutesConfiguraciones : RouteInfo[] = [new RouteInfo("/egresos","Cuenta","fas fa-user")];

  constructor() { }

  ngOnInit(): void { 
    
  }

}
