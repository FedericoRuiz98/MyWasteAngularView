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
  flag : boolean = true;
  usuario : firebase.User | null = null;
  desktop : boolean = true

  constructor(
      private auth : AuthService,
      private router : Router,
      private deviceDetectorService : DeviceDetectorService) {
    this.desktop = this.deviceDetectorService.isDesktop();
  }

  ngOnInit(): void {
    this.auth.getCurrentUser().then(resp => {
      this.usuario = resp;

      console.log(this.usuario);
      console.log(this.usuario?.photoURL);
    });
  }

  toggleSideBar() {
    this.flag = !this.flag;

    this.sidebarShow.emit(this.flag);
  }

  logOut() {
    this.auth.logout().then(resp => this.router.navigate(['/login']));
  }
}
