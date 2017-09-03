import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

@NgModule({
  declarations: [
    HomeComponent,
    SignInComponent,
    AdminPanelComponent,
    CreateFormComponent,
    ManageFormsComponent,
    ResponsesComponent,
    AboutComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    appRouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [FormFunctions],
  bootstrap: [RootComponent]
})
export class AppModule { }
