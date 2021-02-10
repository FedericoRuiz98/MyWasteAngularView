import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { GastosComponent } from './components/views/gastos-charge/gastos.component';
import { TableGastosVariablesComponent } from './components/views/gastos-variables/table-gastos-variables.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { SendEmailComponent } from './components/auth/send-email/send-email.component';
import { SuccessEmailComponent } from './components/auth/success-email/success-email.component';
import { RecoverPasswordComponent } from './components/auth/recover-password/recover-password.component';
import { HomeComponent } from './components/views/home/home.component';
import { IngresosComponent } from './components/views/ingresos/ingresos.component';
import { IngresosChargeComponent } from './components/views/ingresos-charge/ingresos-charge.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { 
    path: 'gastos/variables/cargar',
    component: GastosComponent
  },
  { 
    path: 'gastos/variables',
    component: TableGastosVariablesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'send/email',
    component: SendEmailComponent
  },
  {
    path: 'account-confirm',
    component: SuccessEmailComponent
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'ingresos',
    component: IngresosComponent
  },
  {
    path: 'ingresos/cargar',
    component: IngresosChargeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
