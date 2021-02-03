import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
  providers: [AuthService]
})
export class SendEmailComponent implements OnInit {

  public user : Observable<firebase.User | null> = this.auth.afauth.user;
  
  constructor(
      private auth : AuthService,
      private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('WasMo - Verificacion de Cuenta');
  }

}
