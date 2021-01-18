import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Session } from 'src/app/models/auth/Session';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {  

  //@Output() sessionEmitter = new EventEmitter();

  LoginForm = new FormGroup({
    email: new FormControl("",[
      Validators.required,
      Validators.email,
      Validators.minLength(4),
      Validators.maxLength(32)
    ]),
    password: new FormControl("",[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(32)
    ])
  })
  
  constructor(
    private router: Router,
    private auth : AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    
    if(this.LoginForm.valid) {
      const {email, password} = this.LoginForm.value;
      
      this.auth.login(email).subscribe(resp => {
        console.log(resp);
        if(resp.password == password && resp.email == email) {
          this.router.navigate(['/dashboard']);
        }
      });    
      //this.sessionEmitter.emit(email);
      
    }
    
  }

}
