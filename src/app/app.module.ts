import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

//calender
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; 
FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin
]);

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
import { SendEmailComponent } from './components/auth/send-email/send-email.component';
import { SuccessEmailComponent } from './components/auth/success-email/success-email.component';
import { RecoverPasswordComponent } from './components/auth/recover-password/recover-password.component';
import { HomeComponent } from './components/views/home/home.component';
import { IngresosChargeComponent } from './components/views/ingresos-charge/ingresos-charge.component';
import { CalenderComponent } from './components/views/home/calender/calender.component';
import { IngresosComponent } from './components/views/ingresos/ingresos.component';
import { CurrencyCustomPipe } from './pipes/currency-custom.pipe';
import { GatosFijosComponent } from './components/views/gatos-fijos/gatos-fijos.component';
import { GatosFijosChargeComponent } from './components/views/gatos-fijos-charge/gatos-fijos-charge.component';
import { ItemUndefinedComponent } from './components/shared/item-undefined/item-undefined.component';
import { EstadisticasComponent } from './components/views/estadisticas/estadisticas.component';
import { GastosFijosPieComponent } from './components/views/estadisticas/gastos-fijos-pie/gastos-fijos-pie.component';
import { GastosVariablesPieComponent } from './components/views/estadisticas/gastos-variables-pie/gastos-variables-pie.component';
import { GastosBarChartComponent } from './components/views/estadisticas/gastos-bar-chart/gastos-bar-chart.component';
import { IngresoLineChartComponent } from './components/views/estadisticas/ingreso-line-chart/ingreso-line-chart.component';

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
    GastoInfoComponent,
    SendEmailComponent,
    SuccessEmailComponent,
    RecoverPasswordComponent,
    HomeComponent,
    IngresosChargeComponent,
    CalenderComponent,
    IngresosComponent,
    CurrencyCustomPipe,
    GatosFijosComponent,
    GatosFijosChargeComponent,
    ItemUndefinedComponent,
    EstadisticasComponent,
    GastosFijosPieComponent,
    GastosVariablesPieComponent,
    GastosBarChartComponent,
    IngresoLineChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FullCalendarModule,
    ChartsModule
  ],
  providers: [
    CookieService,
    AngularFirestore,
    DatePipe,
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
