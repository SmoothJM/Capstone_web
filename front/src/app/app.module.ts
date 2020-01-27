import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DiagnoseComponent } from './components/diagnose/diagnose.component';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './components/test/test.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideComponent } from './components/side/side.component';
import { MainComponent } from './components/main/main.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DoctorMainComponent } from './components/doctor.main/doctor.main.component';
import { AdminMainComponent } from './components/admin.main/admin.main.component';

import { LoginGuard } from './guards/login.guard';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { MessageComponent } from './components/message/message.component';
import { MessageService } from './services/message.service';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    DiagnoseComponent,
    LoginComponent,
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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    LoginGuard,
    MessageService
  ],
  bootstrap: [
    AppComponent,
    // NavComponent,
    // FooterComponent
    // TestComponent
  ]
})
export class AppModule { }
