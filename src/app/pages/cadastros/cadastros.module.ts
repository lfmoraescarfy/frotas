import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FlatpickrModule } from "angularx-flatpickr";
import { NgSelectModule } from "@ng-select/ng-select";
import { UiSwitchModule } from "ngx-ui-switch";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { SharedModule } from "src/app/shared/shared.module";
import { NgbDropdownModule, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { defineElement } from "@lordicon/element";

import { CadastrosRoutingModule } from "./cadastros-routing.module";
import { UsuariosComponent } from "./usuarios/pages/usuarios.component";
import { UsuarioHeaderComponent } from "./usuarios/components/usuario-header/usuario-header.component";
import { UsuarioGridComponent } from "./usuarios/components/usuario-grid/usuario-grid.component";
import { UsuarioFormComponent } from "./usuarios/components/usuario-form/usuario-form.component";
import { UsuarioFilterComponent } from "./usuarios/components/usuario-filter/usuario-filter.component";
import lottie from 'lottie-web';
import { FrotaComponent } from "./frotas/pages/frota.component";
import { FrotaGridComponent } from "./frotas/components/frota-grid/frota-grid.component";
import { FrotaHeaderComponent } from "./frotas/components/frota-header/frota-header.component";
import { FrotaFilterComponent } from "./frotas/components/frota-filter/frota-filter.component";
import { FrotaFormComponent } from "./frotas/components/frota-form/frota-form.component";
import { MotoristaFormComponent } from "./motoristas/components/motorista-form/motorista-form.component";
import { MotoristasComponent } from "./motoristas/pages/motoristas.component";
import { MotoristaFilterComponent } from "./motoristas/components/motorista-filter/motorista-filter.component";
import { MotoristaHeaderComponent } from "./motoristas/components/motorista-header/motorista-header.component";
import { MotoristaGridComponent } from "./motoristas/components/motorista-grid/motorista-grid.component";

@NgModule({
  declarations: [
    UsuariosComponent,
    UsuarioFormComponent,
    UsuarioFilterComponent,
    UsuarioGridComponent,
    UsuarioHeaderComponent,
    FrotaComponent,
    FrotaFormComponent,
    FrotaFilterComponent,
    FrotaGridComponent,
    FrotaHeaderComponent,
    MotoristasComponent,
    MotoristaFormComponent,
    MotoristaFilterComponent,
    MotoristaGridComponent,
    MotoristaHeaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgSelectModule,
    UiSwitchModule,
    FlatpickrModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    CKEditorModule,
    NgbPaginationModule,
    AutocompleteLibModule,
    CadastrosRoutingModule,
    SharedModule
  ],
  providers:[
    provideNgxMask(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CadastrosModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
