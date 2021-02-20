import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificacion-modal',
  templateUrl: './notificacion-modal.component.html',
  styleUrls: ['./notificacion-modal.component.scss']
})
export class NotificacionModalComponent implements OnInit {

  @Input() title : string = "";
  @Input() subtitle : string = "";
  @Input() descp : string = "";
  @Input() fecha : string = "";
  @Input() url : string = "";  

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  onClick() {
    this.router.navigate([this.url]);
  }

}
