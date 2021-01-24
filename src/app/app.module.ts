import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

//components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestBtnComponent } from './components/test-btn/test-btn.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { GastosComponent } from './components/views/gastos-charge/gastos.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { GastoFormComponent } from './components/views/gastos-charge/gasto-form/gasto-form.component';
import { GastoAddItemsComponent } from './components/views/gastos-charge/gasto-add-items/gasto-add-items.component';
import { CargandoComponent } from './components/shared/cargando/cargando.component';
import { NotificacionModalComponent } from './components/shared/modals/notificacion-modal/notificacion-modal.component';
import { TableGastosVariablesComponent } from './components/views/gastos-variables/table-gastos-variables.component';
import { PasivoInfoComponent } from './components/views/gastos-variables/pasivo-info/pasivo-info.component';
import { GastoInfoComponent } from './components/views/gastos-variables/gasto-info/gasto-info.component';
import { environment } from 'src/environments/environment';

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
    CargandoComponent,
    NotificacionModalComponent,
    TableGastosVariablesComponent,
    PasivoInfoComponent,
    GastoInfoComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
