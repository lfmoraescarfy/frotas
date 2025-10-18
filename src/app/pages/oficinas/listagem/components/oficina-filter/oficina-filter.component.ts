import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { PaginationService } from "src/app/core/services/pagination.service";
import { cloneDeep } from "lodash";
import { OficinaService } from "../../services/oficinas.service";
import { Oficina } from "../../models/oficina.model";

@Component({
    selector: 'app-oficina-filter',
    templateUrl: 'oficina-filter.component.html'
  })
export class OficinaFilterComponent implements OnInit, OnChanges {
    @Output() setOficinas = new EventEmitter<any>();
    @Output() setAllOficinas = new EventEmitter<any>();

    @Input() selectedTab: number = 1;

    searchTerm: any;
    searchResults: any;
    allOficinas: any[] = [];
    oficinas: any[] = [];

    constructor(
        public paginationService: PaginationService,
        private service: OficinaService) {}

    ngOnInit(): void {
        this.performGet();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.performGet();
    }

    performSearch() {
        this.searchResults = this.allOficinas.filter((oficina: Oficina) => {
          return (
            oficina.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            (oficina.email != null && oficina.email.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
            (oficina.telefone != null && oficina.telefone.toLowerCase().includes(this.searchTerm.toLowerCase()))
          );
        });

        this.oficinas = this.paginationService.changePage(this.searchResults)
        this.setOficinas.emit(this.oficinas);
    }
    
    performGet() {
        this.service.get().subscribe((data) => {
            const response = data as Oficina[];

            this.allOficinas = response == null ? [] : cloneDeep(response);
            this.performFilter();
        });
    }

    performFilter() {
        this.oficinas = this.paginationService.changePage(this.allOficinas);
        this.setAllOficinas.emit(this.allOficinas);
        this.setOficinas.emit(this.oficinas);
    }
}