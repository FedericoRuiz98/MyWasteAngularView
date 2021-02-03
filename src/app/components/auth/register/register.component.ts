import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  RegisterForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.minLength(4),
      Validators.maxLength(32),
      Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(32)
    ]),
    passwordConfirm: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(32)
    ]),
  })

  feedback : string = "";

  constructor(
      private auth: AuthService, 
      private router : Router,
      private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('WasMo - Register');
  }

  passwordI = "";
  passwordConfirmI="";

  get email() { return this.RegisterForm.get('email');}

  get password() { return this.RegisterForm.get('password');}

  get passwordConfirm() { return this.RegisterForm.get('passwordConfirm');}

  public onSubmit() {
    if (this.RegisterForm.valid) {
      const { email, password, passwordConfirm } = this.RegisterForm.value;

      if (password == passwordConfirm) {
        //Intentar registrar usuario
        try {

          this.auth.emailIsUsed(email).then(resp => {
            if(!resp?.length) {
              //register
              const user = this.auth.register(email, password);
              if (user) {   
                this.router.navigate(['/send/email']);
              } else {
                this.feedback = "Ocurrio un error inesperado.";
              }
            } else {
              this.feedback = "Este email ya ha sido utilizado.";
            }
          });
          
        } catch (error) {
          this.feedback = "Ocurrio un error inesperado.";
        }
      } else {
        this.feedback = "Las contraseñas no coinciden.";
      }
    }
  }
}
