import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { PaginationService } from "src/app/core/services/pagination.service";
import { cloneDeep } from "lodash";
import { AgendamentoService } from "../../services/agendamento.service";
import { Agendamento } from "../../../calendario/models/agendamento.model";
import { StatusAgendamento } from "../../../calendario/enums/status-agendamento.enum";
import { TabStatusAgendamento } from "../../enums/tab-status-agendamento.enum";

@Component({
    selector: 'app-agendamento-filter',
    templateUrl: 'agendamento-filter.component.html'
  })
export class AgendamentoFilterComponent implements OnInit, OnChanges {
    @Output() setAgendamentos = new EventEmitter<any>();
    @Output() setAllAgendamentos = new EventEmitter<any>();

    @Input() selectedTab: number = 1;
    StatusAgendamento = StatusAgendamento;

    searchTerm: any;
    searchResults: any;
    allAgendamentos: any[] = [];
    agendamentos: any[] = [];

    constructor(
        public paginationService: PaginationService,
        private service: AgendamentoService) {}

    ngOnInit(): void {
        this.performGet();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.performGet();
    }

    performSearch() {
        this.searchResults = this.allAgendamentos.filter((agendamento: Agendamento) => {
          return (
            agendamento.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            (agendamento.email != null && agendamento.email.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
            (agendamento.telefone != null && agendamento.telefone.toLowerCase().includes(this.searchTerm.toLowerCase()))
          );
        });

        this.agendamentos = this.paginationService.changePage(this.searchResults)
        this.setAgendamentos.emit(this.agendamentos);
    }
    
    performGet() {
        const status = this.getStatusByTab();

        this.service.getByStatus(status).subscribe((data) => {
            let response: Agendamento[] = data.map(agendamento =>  {
                return {
                    id: agendamento.id,
                    data: agendamento.dataInicio,
                    nome: agendamento.nomeCliente,
                    email: agendamento.emailCliente,
                    telefone: agendamento.whatsAppCliente,
                    observacoes: agendamento.observacoes,
                    status: agendamento.status,
                }
            });

           this.allAgendamentos = response == null ? [] : cloneDeep(response);
           this.performFilter();
        });
    }

    performFilter() {
        this.agendamentos = this.paginationService.changePage(this.allAgendamentos);
        this.setAllAgendamentos.emit(this.allAgendamentos);
        this.setAgendamentos.emit(this.agendamentos);
    }

    getStatusByTab() {
        if (this.selectedTab === TabStatusAgendamento.EmAberto) {
            return StatusAgendamento.Aberto.toString();
        }
        if (this.selectedTab === TabStatusAgendamento.Compareceu) {
            return StatusAgendamento.Compareceu.toString();
        }
        if (this.selectedTab === TabStatusAgendamento.NaoCompareceu) {
            return StatusAgendamento.NaoCompareceu.toString();
        }

        return '';
    }
}