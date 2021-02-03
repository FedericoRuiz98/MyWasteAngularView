import { Component, Input, OnInit } from '@angular/core';
import { RouteInfo } from 'src/app/models/Routes/RouteInfo';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [AuthService]
})
export class SidebarComponent implements OnInit {

  RoutesEgreosos : RouteInfo[] = [
    new RouteInfo("/","Cargar","",true),
    new RouteInfo("/","Listas","")
  ];
  RoutesIngresos : RouteInfo[] = [
    new RouteInfo("/","Cargar",""),
    new RouteInfo("/","Listas","")
  ];
  RoutesEtiquetas : RouteInfo[] = [
    new RouteInfo("/","Categorias",""),
    new RouteInfo("/","Sub Categorias","")
  ];
  RoutesEstadisticas : RouteInfo[] = [
    new RouteInfo("/","Consumo",""),
    new RouteInfo("/","Balance","")
  ];

  

  constructor() { }

  ngOnInit(): void { 
    
  }

  

}
