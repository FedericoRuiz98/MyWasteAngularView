import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
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
  desktop : boolean = true;
  LoginForm = new FormGroup({
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
    ])
  })

  feedback : string = "";

  constructor(
    private router: Router,
    private auth: AuthService,
    private titleService: Title,
    private deviceDetectorService : DeviceDetectorService) { 
      this.desktop = this.deviceDetectorService.isDesktop();
  }

  ngOnInit(): void {
    this.titleService.setTitle('WasMo - Login');
  }

  get email() { return this.LoginForm.get('email');}

  get password() { return this.LoginForm.get('password');}

  async loginGoogle() {
    const resp = await this.auth.loginGoogle();

    if(resp) {
      this.router.navigate(['/home']);
    }
  }

  async onSubmit() {

    if (this.LoginForm.valid) {
      const { email, password } = this.LoginForm.value;

      //Intentar logearse
      try {

        //login
        const resp = await this.auth.login(email, password);

        //hay respuesta?
        if(resp) {

          //email verificado?
          if(resp.user?.emailVerified) {
            this.feedback = "";
            this.router.navigate(['/home']);
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
