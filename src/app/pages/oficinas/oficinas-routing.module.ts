import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { OficinasComponent } from './listagem/pages/oficinas.component';

const routes: Routes = [
  {
    path:"listagem",
    component: OficinasComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OficinasRoutingModule {}
