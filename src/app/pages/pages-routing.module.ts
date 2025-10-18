import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path: '', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
    },
    {
      path: 'configuracoes', loadChildren: () => import('./configuracoes/configuracoes.module').then(m => m.ConfiguracoesModule)
    },
    {
      path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)
    },
    {
      path: 'cadastros', loadChildren: () => import('./cadastros/cadastros.module').then(m => m.CadastrosModule)
    },
    {
      path: 'agendamentos', loadChildren: () => import('./agendamentos/agendamentos.module').then(m => m.AgendamentosModule)
    },
    {
      path: 'oficinas', loadChildren: () => import('./oficinas/oficinas.module').then(m => m.OficinasModule)
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
