import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidebarShow = new EventEmitter<boolean>();
  toggleApp : boolean = false;
  usuario : firebase.User | null = null;
  desktop : boolean = true;

  constructor(
      private auth : AuthService,
      private router : Router,
      private deviceDetectorService : DeviceDetectorService) {
    this.desktop = this.deviceDetectorService.isDesktop();
  }

  ngOnInit(): void {
    this.auth.getCurrentUser().then(resp => {
      this.usuario = resp;
    });
  }

  toggleSideBar() {
    this.toggleApp = !this.toggleApp;

    this.sidebarShow.emit(this.toggleApp);
  }

  logOut() {
    this.auth.logout().then();
  }
}
