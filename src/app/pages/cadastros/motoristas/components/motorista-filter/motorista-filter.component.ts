import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { PaginationService } from "src/app/core/services/pagination.service";
import { cloneDeep } from "lodash";
import { MotoristasService } from "../../services/motorista.service";

@Component({
    selector: 'app-motorista-filter',
    templateUrl: 'motorista-filter.component.html'
  })
export class MotoristaFilterComponent implements OnInit {
    @Output() setMotoristas = new EventEmitter<any>();
    @Output() setAllMotoristas = new EventEmitter<any>();

    searchTerm: any;
    searchResults: any;
    allMotoristas: any[] = [];
    motoristas?: any[] = [];

    constructor(
        public paginationService: PaginationService,
        private service: MotoristasService) {}

    ngOnInit(): void {
      this.performGet();
    }

    performSearch() {
        this.searchResults = this.allMotoristas.filter((item: any) => {
          return (
            item.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            (item.cpf != null && item.cpf.toLowerCase().includes(this.searchTerm.toLowerCase()))
          );
        });

        this.motoristas = this.paginationService.changePage(this.searchResults)
        this.setMotoristas.emit(this.motoristas);
    }
    
    performGet() {
      this.service.getActive().subscribe((data) => {
          this.allMotoristas = data == null ? [] : cloneDeep(data);
          this.motoristas = this.paginationService.changePage(this.allMotoristas);

          this.setAllMotoristas.emit(this.allMotoristas);
          this.setMotoristas.emit(this.motoristas);
      });
    }
}