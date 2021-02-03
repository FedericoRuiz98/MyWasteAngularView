import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  feedback : string = "";
  emailSent : boolean = false;

  RecoverForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.minLength(4),
      Validators.maxLength(32),
      Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ])
  });

  constructor(private auth : AuthService,private router : Router) { }

  get email() { return this.RecoverForm.get('email');}

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('email');

    const email = this.RecoverForm.get('email')?.value;
    console.log(email)
    
    if(email) {

      this.auth.emailIsUsed(email).then(resp => {
        if(resp?.length) {
          this.feedback = "";
          this.auth.recoverPassword(email).then(resp => {
            this.emailSent = true;
          });
          //this.router.navigate(['/login']);
        } else {
          this.feedback = "Este email no esta asociado a niguna cuenta.";
        }
      });
      
    } 
    
  }
}
