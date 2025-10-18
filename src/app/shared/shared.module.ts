import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule, NgbAccordionModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Counter
import { CountUpModule } from 'ngx-countup';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ClientLogoComponent } from './landing/index/client-logo/client-logo.component';
import { ServicesComponent } from './landing/index/services/services.component';
import { CollectionComponent } from './landing/index/collection/collection.component';
import { CtaComponent } from './landing/index/cta/cta.component';
import { DesignedComponent } from './landing/index/designed/designed.component';
import { PlanComponent } from './landing/index/plan/plan.component';
import { FaqsComponent } from './landing/index/faqs/faqs.component';
import { ReviewComponent } from './landing/index/review/review.component';
import { CounterComponent } from './landing/index/counter/counter.component';
import { WorkProcessComponent } from './landing/index/work-process/work-process.component';
import { TeamComponent } from './landing/index/team/team.component';
import { ContactComponent } from './landing/index/contact/contact.component';
import { FooterComponent } from './landing/index/footer/footer.component';
import { ScrollspyDirective } from './scrollspy.directive';

// NFT Landing 
import { MarketPlaceComponent } from './landing/nft/market-place/market-place.component';
import { WalletComponent } from './landing/nft/wallet/wallet.component';
import { FeaturesComponent } from './landing/nft/features/features.component';
import { CategoriesComponent } from './landing/nft/categories/categories.component';
import { DiscoverComponent } from './landing/nft/discover/discover.component';
import { TopCreatorComponent } from './landing/nft/top-creator/top-creator.component';

// Job Landing 
import { BlogComponent } from './landing/job/blog/blog.component';
import { CandidateComponent } from './landing/job/candidate/candidate.component';
import { ProcessComponent } from './landing/job/process/process.component';
import { JobFooterComponent } from './landing/job/job-footer/job-footer.component';
import { FindjobsComponent } from './landing/job/findjobs/findjobs.component';
import { JobcategoriesComponent } from './landing/job/jobcategories/jobcategories.component';
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
    ClientLogoComponent,
    ServicesComponent,
    CollectionComponent,
    CtaComponent,
    DesignedComponent,
    PlanComponent,
    FaqsComponent,
    ReviewComponent,
    CounterComponent,
    WorkProcessComponent,
    TeamComponent,
    ContactComponent,
    FooterComponent,
    ScrollspyDirective,
    LandingScrollspyDirective,
    MarketPlaceComponent,
    WalletComponent,
    FeaturesComponent,
    CategoriesComponent,
    DiscoverComponent,
    TopCreatorComponent,
    BlogComponent,
    CandidateComponent,
    ProcessComponent,
    JobFooterComponent,
    FindjobsComponent,
    JobcategoriesComponent,
    EnderecoComponent,
    TelefonePipe,
    CpfPipe,
    CnpjPipe,
    PerfilPipe,
    DataHoraPipe,
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
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask(),
  ],
  exports: [
    BreadcrumbsComponent,
    ClientLogoComponent,
    ServicesComponent,
    CollectionComponent,
    CtaComponent,
    DesignedComponent,
    PlanComponent,
    FaqsComponent,
    ReviewComponent,
    CounterComponent,
    WorkProcessComponent,
    TeamComponent,
    ContactComponent,
    FooterComponent,
    ScrollspyDirective,
    LandingScrollspyDirective,
    WalletComponent,
    MarketPlaceComponent,
    FeaturesComponent,
    CategoriesComponent,
    DiscoverComponent,
    TopCreatorComponent,
    ProcessComponent,
    FindjobsComponent,
    CandidateComponent,
    BlogComponent,
    JobcategoriesComponent,
    JobFooterComponent,
    EnderecoComponent,
    TelefonePipe,
    CpfPipe,
    CnpjPipe,
    PerfilPipe,
    DataHoraPipe,
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