import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { PaginationService } from "src/app/core/services/pagination.service";
import { UsuarioService } from "../../services/usuario.service";
import { cloneDeep } from "lodash";

@Component({
    selector: 'app-usuario-filter',
    templateUrl: 'usuario-filter.component.html'
  })
export class UsuarioFilterComponent implements OnInit {
    @Output() setUsuarios = new EventEmitter<any>();
    @Output() setAllUsuarios = new EventEmitter<any>();

    searchTerm: any;
    searchResults: any;
    allUsuarios: any[] = [];
    usuarios?: any[] = [];

    constructor(
        public paginationService: PaginationService,
        private service: UsuarioService) {}

    ngOnInit(): void {
      this.performGet();
    }

    performSearch() {
        this.searchResults = this.allUsuarios.filter((item: any) => {
          return (
            item.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            (item.email != null && item.email.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
            (item.cpf != null && item.cpf.toLowerCase().includes(this.searchTerm.toLowerCase()))
          );
        });

        this.usuarios = this.paginationService.changePage(this.searchResults)
        this.setUsuarios.emit(this.usuarios);
    }
    
    performGet() {
      this.service.getActive().subscribe((data) => {
          this.allUsuarios = data == null ? [] : cloneDeep(data);
          this.usuarios = this.paginationService.changePage(this.allUsuarios);

          this.setAllUsuarios.emit(this.allUsuarios);
          this.setUsuarios.emit(this.usuarios);
      });
    }
}