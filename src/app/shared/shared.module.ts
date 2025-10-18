import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule, NgbAccordionModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Counter
import { CountUpModule } from 'ngx-countup';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ScrollspyDirective } from './scrollspy.directive';

// Job Landing 
import { LandingScrollspyDirective } from './landingscrollspy.directive';
import { EnderecoComponent } from './components/endereco/endereco.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import lottie from 'lottie-web';
import { defineElement } from '@lordicon/element';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { TelefonePipe } from './pipes/telefone.pipe';
import { CpfPipe } from './pipes/cpf.pipe';
import { CnpjPipe } from './pipes/cnpj.pipe';
import { PerfilPipe } from './pipes/perfil.pipe';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { DecimalDirective } from './directives/decimal.directive';
import { DataHoraPipe } from './pipes/data-hora.pipe';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import flatpickr from 'flatpickr';
import { UppercaseDirective } from './directives/upper-case.directive';

export function flatpickrFactory() {
  flatpickr.localize(Portuguese);
  return flatpickr;
}

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    ScrollspyDirective,
    LandingScrollspyDirective,
    EnderecoComponent,
    NumberOnlyDirective,
    DecimalDirective,
    UppercaseDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbDropdownModule,
    SlickCarouselModule,
    CountUpModule,
    NgxMaskDirective, 
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ],
  exports: [
    BreadcrumbsComponent,
    ScrollspyDirective,
    LandingScrollspyDirective,
    EnderecoComponent,
    NumberOnlyDirective,
    DecimalDirective,
    UppercaseDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}