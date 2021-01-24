import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  RegisterForm = new FormGroup({
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
    ]),
    passwordConfirm: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(32)
    ]),
  })

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    if (this.RegisterForm.valid) {
      const { email, password, passwordConfirm } = this.RegisterForm.value;

      if (password == passwordConfirm) {
        //Intentar registrar usuario
        try {

          //login
          const user = this.auth.register(email, password);

          if (user) {
            console.log(user);
            //this.router.navigate(['/dashboard']);
          } else {
            console.log("Ocurrio un error");
          }

        } catch (error) {
          console.log(error);
        }
      }
    }
  }
}
