import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbDropdownModule, NgbAccordionModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlatpickrModule } from 'angularx-flatpickr';
import { defineElement } from '@lordicon/element';
import lottie from 'lottie-web';
import { NgPipesModule } from 'ngx-pipes';
import { SharedModule } from '../../shared/shared.module';
import { ConfiguracoesRoutingModule } from './configuracoes-routing.module';
import { PerfilComponent } from './perfil/pages/perfil.component';
import { PerfilSenhaComponent } from './perfil/components/perfil-senha/perfil-senha.component';
import { PerfilDadosPessoaisComponent } from './perfil/components/perfil-dados-pessoais/perfil-dados-pessoais.component';
import { ParametrosComponent } from './parametros/pages/parametros.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { DadosEmpresaComponent } from './parametros/components/dados-empresa/dados-empresa.component';
import { ParametrosEmpresaComponent } from './parametros/components/parametros-empresa/parametros-empresa.component';
import { NgxCurrencyDirective, NgxCurrencyInputMode, provideEnvironmentNgxCurrency } from 'ngx-currency';
import { LogoEmpesaComponent } from './parametros/components/logo-empresa/logo-empresa.component';

@NgModule({
  declarations: [
    PerfilComponent,
    PerfilSenhaComponent,
    PerfilDadosPessoaisComponent,
    ParametrosComponent,
    DadosEmpresaComponent,
    ParametrosEmpresaComponent,
    LogoEmpesaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbAccordionModule,
    NgbTooltipModule,
    SlickCarouselModule,
    NgSelectModule,
    FlatpickrModule,
    ConfiguracoesRoutingModule,
    SharedModule,
    NgPipesModule,
    NgxMaskDirective, 
    NgxCurrencyDirective,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask(),
    provideEnvironmentNgxCurrency({
      align: "right",
      allowNegative: true,
      allowZero: true,
      decimal: ",",
      precision: 2,
      prefix: "R$ ",
      suffix: "",
      thousands: ".",
      nullable: true,
      min: null,
      max: null,
      inputMode: NgxCurrencyInputMode.Financial,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfiguracoesModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
