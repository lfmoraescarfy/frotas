import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { CalendarioComponent } from './calendario/pages/calendario.component';
import { AgendamentosComponent } from './listagem/pages/agendamentos.component';

const routes: Routes = [
  {
    path:"calendario",
    component: CalendarioComponent
  },
  {
    path:"listagem",
    component: AgendamentosComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AgendamentosRoutingModule {}
