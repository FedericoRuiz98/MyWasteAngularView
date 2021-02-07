import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.scss']
})
export class CargandoComponent implements OnInit {

  @Input() isLoaded : any = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
