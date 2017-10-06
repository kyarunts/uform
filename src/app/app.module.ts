import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { appRouterModule } from './app.routes';
import { RootComponent } from './root.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { ManageFormsComponent } from './manage-forms/manage-forms.component';
import { ResponsesComponent } from './responses/responses.component';
import { AboutComponent } from './about/about.component';
import { FormFunctions } from './generics/form-functions.service';
import { PreviewComponent } from './create-form/preview/preview.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserService } from 'app/services/user/user.service';
import { AuthService } from 'app/services/user/auth.service';
import { AuthGuard } from 'app/services/user/auth-guard.service';
import { FormService } from 'app/services/form/form.service';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    HomeComponent,
    SignInComponent,
    AdminPanelComponent,
    CreateFormComponent,
    ManageFormsComponent,
    ResponsesComponent,
    AboutComponent,
    RootComponent,
    PreviewComponent,
    NavbarComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    appRouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [FormFunctions, UserService, AuthService, AuthGuard, FormService ],
  bootstrap: [RootComponent]
})
export class AppModule { }
