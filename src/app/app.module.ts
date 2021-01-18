import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

//components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestBtnComponent } from './components/test-btn/test-btn.component';
import { DashboardComponent } from './components/shared/dashboard/dashboard.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { GastoFormComponent } from './components/gastos/gasto-form/gasto-form.component';
import { GastoAddItemsComponent } from './components/gastos/gasto-add-items/gasto-add-items.component';
import { CargandoComponent } from './components/shared/cargando/cargando.component';
@NgModule({
  declarations: [
    AppComponent,
    TestBtnComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    GastosComponent,
    RegisterComponent,
    LoginComponent,
    GastoFormComponent,
    GastoAddItemsComponent,
    CargandoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
