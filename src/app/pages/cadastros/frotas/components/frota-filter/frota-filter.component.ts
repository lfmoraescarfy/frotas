import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { PaginationService } from "src/app/core/services/pagination.service";
import { cloneDeep } from "lodash";
import { FrotasService } from "../../services/frota.service";

@Component({
    selector: 'app-frota-filter',
    templateUrl: 'frota-filter.component.html'
  })
export class FrotaFilterComponent implements OnInit {
    @Output() setVeiculos = new EventEmitter<any>();
    @Output() setAllVeiculos = new EventEmitter<any>();

    searchTerm: any;
    searchResults: any;
    allVeiculos: any[] = [];
    veiculos: any[] = [];

    constructor(
        public paginationService: PaginationService,
        private service: FrotasService) {}

    ngOnInit() {
      this.performGet();
    }
    
    performSearch() {
        this.searchResults = this.allVeiculos.filter((item: any) => {
          return (
            item.marca.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            item.modelo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            item.placa.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            (item.anoFabricacao != null && item.anoFabricacao.toString().includes(this.searchTerm)) ||
            (item.cor != null && item.cor.toLowerCase().includes(this.searchTerm.toLowerCase()))
          );
        });

        this.veiculos = this.paginationService.changePage(this.searchResults)
        this.setVeiculos.emit(this.veiculos);
    }
    
    performGet() {
        this.service.getActive().subscribe((data) => {
           this.allVeiculos = data == null || data.length <= 0 ? [] : cloneDeep(data.veiculos);
           this.veiculos = this.paginationService.changePage(this.allVeiculos);

           this.setAllVeiculos.emit(this.allVeiculos);
           this.setVeiculos.emit(this.veiculos);
        });
    }
}