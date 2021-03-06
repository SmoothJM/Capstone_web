import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular2-chartjs';
import { ChartsModule } from 'ng2-charts';

import { LoginGuard } from './guards/login.guard';
import { MessageService } from './services/message.service';
import { DoctorService } from './services/doctor.service';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { DiagnoseComponent } from './components/diagnose/diagnose.component';
import { TestComponent } from './components/test/test.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideComponent } from './components/side/side.component';
import { MainComponent } from './components/main/main.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DoctorMainComponent } from './components/doctor.main/doctor.main.component';
import { AdminMainComponent } from './components/admin.main/admin.main.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { MessageComponent } from './components/message/message.component';
import { RegisterComponent } from './components/register/register.component';
import { OverviewComponent } from './components/overview/overview.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AppointmentHistoryComponent } from './components/appointment-history/appointment-history.component';
import { DiagnoseHistoryComponent } from './components/diagnose-history/diagnose-history.component';
import { AppointmentDoctorComponent } from './components/appointment-doctor/appointment-doctor.component';
import { PatientComponent } from './components/patient/patient.component';
import { ResearchComponent } from './components/research/research.component';
import { ChatComponent } from './components/chat/chat.component';
import { ManagerDoctorComponent } from './components/manager-doctor/manager-doctor.component';
import { ManagerCustomerComponent } from './components/manager-customer/manager-customer.component';
import { TrustUrlPipePipe } from './guards/trust-url-pipe.pipe';
import { ChatCustomerComponent } from './components/chat-customer/chat-customer.component';
import { StaffComponent } from './components/staff/staff.component';
import { AboutComponent } from './components/about/about.component';
import { QuickComponent } from './components/quick/quick.component';


@NgModule({
  declarations: [
    AppComponent,
    DiagnoseComponent,
    TestComponent,
    NavComponent,
    FooterComponent,
    SideComponent,
    MainComponent,
    WelcomeComponent,
    DoctorMainComponent,
    AdminMainComponent,
    ErrorPageComponent,
    MessageComponent,
    RegisterComponent,
    OverviewComponent,
    AppointmentComponent,
    ProfileComponent,
    AppointmentHistoryComponent,
    DiagnoseHistoryComponent,
    AppointmentDoctorComponent,
    PatientComponent,
    ResearchComponent,
    ChatComponent,
    ManagerDoctorComponent,
    ManagerCustomerComponent,
    TrustUrlPipePipe,
    ChatCustomerComponent,
    StaffComponent,
    AboutComponent,
    QuickComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    ChartModule,
    ChartsModule
  ],
  providers: [
    LoginGuard,
    MessageService,
    DoctorService,
    DatePipe
  ],
  bootstrap: [
    AppComponent,
    // NavComponent,
    // FooterComponent
    // TestComponent
  ]
})
export class AppModule { }
