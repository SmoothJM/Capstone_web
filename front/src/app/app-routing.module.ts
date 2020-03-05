import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {MainComponent} from './components/main/main.component';
import {DoctorMainComponent} from './components/doctor.main/doctor.main.component';
import {AdminMainComponent} from './components/admin.main/admin.main.component';
import {LoginGuard} from './guards/login.guard';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {RegisterComponent} from './components/register/register.component';
import {OverviewComponent} from './components/overview/overview.component';
import {DiagnoseComponent} from './components/diagnose/diagnose.component';
import {AppointmentComponent} from './components/appointment/appointment.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AppointmentHistoryComponent} from './components/appointment-history/appointment-history.component';
import {DiagnoseHistoryComponent} from './components/diagnose-history/diagnose-history.component';
import {AppointmentDoctorComponent} from './components/appointment-doctor/appointment-doctor.component';
import {ResearchComponent} from './components/research/research.component';
import {PatientComponent} from './components/patient/patient.component';
import {InfoComponent} from './components/info/info.component';
import {ChatComponent} from './components/chat/chat.component';
import {ChatCustomerComponent} from './components/chat-customer/chat-customer.component';
import {ManagerCustomerComponent} from './components/manager-customer/manager-customer.component';
import {ManagerDoctorComponent} from './components/manager-doctor/manager-doctor.component';

const routes: Routes = [
  {
    path: 'main', component: MainComponent, children: [
      {path: '', redirectTo:'overview', pathMatch: 'full'},
      {path: 'overview', component: OverviewComponent},
      {path: 'diagnose', component: DiagnoseComponent},
      {path: 'appointment', component: AppointmentComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'history/appointment', component: AppointmentHistoryComponent},
      {path: 'history/diagnose', component: DiagnoseHistoryComponent},
      {path: 'chat/customer', component: ChatCustomerComponent},
    ], canActivate: [LoginGuard]
  },
  {
    path: 'doctor', component: DoctorMainComponent, children: [
      {path: '', redirectTo:'overview', pathMatch: 'full'},
      {path: 'overview', component: OverviewComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'appointment', component: AppointmentDoctorComponent},
      {path: 'research', component: ResearchComponent},
      {path: 'patient', component: PatientComponent},
      {path: 'chat', component: ChatComponent},
      // {path: 'chat/:selectCus', component: ChatComponent},
    ], canActivate: [LoginGuard]
  },
  {
    path: 'admin', component: AdminMainComponent, children: [
      {path: '', redirectTo:'overview', pathMatch: 'full'},
      {path: 'overview', component: OverviewComponent},
      {path: 'customer', component: ManagerCustomerComponent},
      {path: 'doctor', component: ManagerDoctorComponent},
      {path: 'info', component: InfoComponent},
    ],
    canActivate: [LoginGuard]
  },
  {path: 'register', component: RegisterComponent},
  {path: '', component: WelcomeComponent},
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
