import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainerLogin } from './login/components/toast/toasts-container-login.component';

import { AccountRoutingModule } from './account-routing.module';
import { SigninModule } from "./auth/signin/signin.module";
import { LoginComponent } from './login/pages/login/login.component';
import { PassResetComponent } from './pass-reset/pages/pass-reset.component';

// Load Icons
import { defineElement } from '@lordicon/element';
import lottie from 'lottie-web';
import { PassCreateComponent } from './pass-create/pages/pass-create.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    LoginComponent,
    PassCreateComponent,
    PassResetComponent,
    NotFoundComponent,
    ToastsContainerLogin
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbToastModule,
    AccountRoutingModule,
    SigninModule,
    NgbCarouselModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
