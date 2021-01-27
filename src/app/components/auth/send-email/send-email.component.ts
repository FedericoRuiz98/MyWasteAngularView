import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
  providers: [AuthService]
})
export class SendEmailComponent implements OnInit {

  public user : Observable<firebase.User | null> = this.auth.afauth.user;
  
  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  sendEmail() {
    this.auth.sendEmail();
  }

}
