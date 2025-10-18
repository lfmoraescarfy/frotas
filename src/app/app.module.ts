import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from "./layouts/layouts.module";
import { PagesModule } from "./pages/pages.module";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { rootReducer } from './store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import localePT from "@angular/common/locales/pt";
import { LoadingInterceptor } from './shared/components/loading/loading.interceptor';
import { LoadingService } from './shared/components/loading/loading.service';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { NgxCurrencyDirective, NgxCurrencyInputMode, provideEnvironmentNgxCurrency } from 'ngx-currency';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

registerLocaleData(localePT, "pt");

export function initializeApp(configService: EnvironmentService) {
  return (): Promise<any> => {
    return configService.loadConfig();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
  ],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'pt',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    PagesModule,
    NgxCurrencyDirective,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([]),
    NgbModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-Br" },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    provideEnvironmentNgxMask(),
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
    LoadingService,
    EnvironmentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import flatpickr from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { registerLocaleData } from '@angular/common';
import { EnvironmentService } from './config/environment.service';

export function flatpickrFactory() {
  flatpickr.localize(Portuguese);
  return flatpickr;
}
