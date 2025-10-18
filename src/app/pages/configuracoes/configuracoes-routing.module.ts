import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/pages/perfil.component';
import { ParametrosComponent } from './parametros/pages/parametros.component';

const routes: Routes = [
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'parametros',
    component: ParametrosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracoesRoutingModule { }
