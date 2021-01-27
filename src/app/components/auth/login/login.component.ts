import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Session } from 'src/app/models/auth/Session';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  //@Output() sessionEmitter = new EventEmitter();

  LoginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.minLength(4),
      Validators.maxLength(32)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(32)
    ])
  })

  feedback : string = "";

  constructor(
    private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
  }

  get email() { return this.LoginForm.get('email');}

  get password() { return this.LoginForm.get('password');}

  async loginGoogle() {
    this.auth.loginGoogle();
  }

  async onSubmit() {

    if (this.LoginForm.valid) {
      const { email, password } = this.LoginForm.value;

      //Intentar logearse
      try {

        //login
        const user = await this.auth.login(email, password);

        //&& user.user?.emailVerified
        if(user) {

          //email verificado?
          if(user.user?.emailVerified) {
            this.feedback = "";
            console.log(user);
            //this.router.navigate(['/dashboard']);
          } else {
            this.feedback = "Necesitas verificar tu email.";
          }  
        } else {
          this.feedback = "El email y/o la contraseña son incorrectas.";
        }
      } catch (error) {
        this.feedback = "Ocurrio un error inesperado.";
      }
    }
  }
}
