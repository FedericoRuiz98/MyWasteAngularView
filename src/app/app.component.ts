import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { timer } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService],
})
export class AppComponent {
  title = 'MyWasteAngularView';
  publicUrls : string[] = [
    "/login",
    "/recover-password",
    "/register",
    "/send/email",
    "/account-confirm"
  ]

  constructor(
      private auth: AuthService,
      private router: Router) {
    }

  ngOnInit() {
    const reloadInterval = 60000;

    //checkear cada 1 minuto el usuario
    timer(0, reloadInterval).subscribe(resp => {

      //esta en las urls publicas?
      let acum = 0;
      this.publicUrls.forEach(u => {
        if(this.router.url !== u) {
          acum++;
        }
      });

      //check user 🔍
      if(acum == this.publicUrls.length) {
        this.checkUser();
      }
    });
  }  

  checkUser() {
    this.auth.getCurrentUser().then((resp) => {
      if (!resp) {
        this.router.navigate(['/login']);
      }
    });
  }

}
