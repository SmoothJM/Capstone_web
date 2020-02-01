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

const routes: Routes = [
  {
    path: 'main', component: MainComponent, children: [
      {path: 'overview', component: OverviewComponent},
      {path: 'diagnose', component: DiagnoseComponent},
      {path: 'appointment', component: AppointmentComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'history/appointment', component: AppointmentHistoryComponent},
      {path: 'history/diagnose', component: DiagnoseHistoryComponent},
    ], canActivate: [LoginGuard]
  },
  {path: 'doctor', component: DoctorMainComponent, canActivate: [LoginGuard]},
  {path: 'admin', component: AdminMainComponent, canActivate: [LoginGuard]},
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
