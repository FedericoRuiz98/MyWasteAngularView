import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { GastosComponent } from './components/views/gastos-charge/gastos.component';
import { TableGastosVariablesComponent } from './components/views/gastos-variables/table-gastos-variables.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/gastos/variables/cargar',
    pathMatch: 'full'
  },
  { 
    path: 'gastos/variables/cargar',
    component: GastosComponent
  },
  { 
    path: 'gastos/variables',
    component: TableGastosVariablesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
