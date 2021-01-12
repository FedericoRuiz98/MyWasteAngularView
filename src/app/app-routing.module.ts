import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GastosComponent } from './components/gastos/gastos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/gastos',
    pathMatch: 'full'
  },
  { 
    path: 'gastos',
    component: GastosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
