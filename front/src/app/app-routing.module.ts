import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {MainComponent} from './components/main/main.component';
import {DoctorMainComponent} from './components/doctor.main/doctor.main.component';
import {AdminMainComponent} from './components/admin.main/admin.main.component';
import {LoginGuard} from './guards/login.guard';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {RegisterComponent} from './components/register/register.component';

const routes: Routes = [
  {path:'main', component: MainComponent, canActivate: [LoginGuard]},
  {path:'doctor', component: DoctorMainComponent, canActivate: [LoginGuard]},
  {path:'admin', component: AdminMainComponent, canActivate: [LoginGuard]},
  {path:'register', component: RegisterComponent},
  {path:'', component: WelcomeComponent},
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
