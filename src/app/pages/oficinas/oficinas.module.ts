import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import lottie from 'lottie-web';
import { defineElement } from "@lordicon/element";
import { FlatpickrModule } from "angularx-flatpickr";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { NgbDropdownModule, NgbNavModule, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { OficinasComponent } from "./listagem/pages/oficinas.component";
import { OficinasRoutingModule } from "./oficinas-routing.module";
import { OficinaFilterComponent } from "./listagem/components/oficina-filter/oficina-filter.component";
import { OficinaGridComponent } from "./listagem/components/oficina-grid/oficina-grid.component";

@NgModule({
  declarations: [
    OficinasComponent,
    OficinaFilterComponent,
    OficinaGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OficinasRoutingModule,
    SharedModule,
    NgbPaginationModule,
    NgbNavModule,
    NgbDropdownModule,
    FlatpickrModule.forRoot(),
    NgxMaskDirective, 
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask(),
    DatePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OficinasModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
