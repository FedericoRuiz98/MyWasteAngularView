import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService],
})
export class AppComponent {
  title = 'MyWasteAngularView';

  constructor(
      private auth: AuthService,
      private router: Router) {
    }

  ngOnInit() {
    this.auth.getCurrentUser().then((resp) => {
      if (!resp) {
        this.router.navigate(['/login']);
      } else {
        //time out futuro
      }
    });
  }  

}
