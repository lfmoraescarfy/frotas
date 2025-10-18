import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { UsuariosComponent } from './usuarios/pages/usuarios.component';
import { FrotaComponent } from './frotas/pages/frota.component';
import { MotoristasComponent } from './motoristas/pages/motoristas.component';

const routes: Routes = [
  {
    path:"frota",
    component: FrotaComponent
  },
  {
    path:"usuarios",
    component: UsuariosComponent
  },
  {
    path:"motoristas",
    component: MotoristasComponent
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CadastrosRoutingModule {}
