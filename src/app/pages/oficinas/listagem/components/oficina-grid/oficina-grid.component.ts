import { Component, Input } from "@angular/core";
import { Oficina } from "../../models/oficina.model";

@Component({
    selector: 'app-oficina-grid',
    templateUrl: 'oficina-grid.component.html'
  })
export class OficinaGridComponent {
    @Input() oficinas: Oficina[] = [];
    @Input() allOficinas: Oficina[] = [];

    companydetail(index: any){

    }
}