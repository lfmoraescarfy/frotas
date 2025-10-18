import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { AgendamentosRoutingModule } from "./agendamentos-routing.module";
import lottie from 'lottie-web';
import { defineElement } from "@lordicon/element";
import { FullCalendarModule } from "@fullcalendar/angular";
import { CalendarioComponent } from "./calendario/pages/calendario.component";
import { FlatpickrModule } from "angularx-flatpickr";
import { AgendamentoFormComponent } from "./calendario/components/agendamento-form/agendamento-form.component";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { AgendamentoViewComponent } from "./calendario/components/agendamento-view/agendamento-view.component";
import { AgendamentosComponent } from "./listagem/pages/agendamentos.component";
import { AgendamentoHeaderComponent } from "./listagem/components/agendamento-header/agendamento-header.component";
import { NgbDropdownModule, NgbNavModule, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { AgendamentoGridComponent } from "./listagem/components/agendamento-grid/agendamento-grid.component";
import { AgendamentoFilterComponent } from "./listagem/components/agendamento-filter/agendamento-filter.component";
import { AgendamentoTabsComponent } from "./listagem/components/agendamento-tabs/agendamento-tabs.component";

@NgModule({
  declarations: [
    CalendarioComponent,
    AgendamentoFormComponent,
    AgendamentoViewComponent,
    AgendamentosComponent,
    AgendamentoHeaderComponent,
    AgendamentoGridComponent,
    AgendamentoFilterComponent,
    AgendamentoTabsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgendamentosRoutingModule,
    SharedModule,
    NgbPaginationModule,
    NgbNavModule,
    NgbDropdownModule,
    FullCalendarModule,
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
export class AgendamentosModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
