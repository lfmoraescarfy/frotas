import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { PaginationService } from "src/app/core/services/pagination.service";
import { Agendamento } from "../../../calendario/models/agendamento.model";
import { StatusAgendamento, StatusAgendamentoLabel } from "../../../calendario/enums/status-agendamento.enum";
import { AgendamentoService } from "../../services/agendamento.service";
import { EmailNoShowRequest } from "../../models/requests/email-no-show.request";
import Swal from "sweetalert2";
import { UpdateStatusAgendamentoRequest } from "../../../calendario/models/requests/update-status-agendamento.request";
import { CalendarioService } from "../../../calendario/services/calendario.service";
import { Usuario } from "src/app/core/models/usuario.model";
import { TokenStorageService } from "src/app/core/services/token-storage.service";
import { ParametrosService } from "src/app/pages/configuracoes/parametros/services/parametros.service";

@Component({
    selector: 'app-agendamento-grid',
    templateUrl: 'agendamento-grid.component.html'
  })
export class AgendamentoGridComponent implements OnInit, OnChanges {
  @Input() allAgendamentos: Agendamento[] = [];
  @Input() agendamentos: Agendamento[] = [];

  StatusAgendamento = StatusAgendamento;
  StatusAgendamentoLabel = StatusAgendamentoLabel;

  nomeOficina: string = '';

  constructor(
    public paginationService: PaginationService,
    public agendamentoService: AgendamentoService,
    public calendarioService: CalendarioService,
    private parametrosService: ParametrosService,
    private tokenStorageService : TokenStorageService,
  ) {}

  ngOnInit(): void {
    this.setNomeOficina();
  }

  setNomeOficina(): void {
    const usuario: Usuario = this.tokenStorageService.getUser();

    this.parametrosService.get(usuario.idEmpresa).subscribe((response) => {
        this.nomeOficina = response.nome;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.agendamentos.currentValue.length > 0){
      this.paginationService.init(changes.agendamentos.currentValue);
    }
  }
  
  changePage() {
    this.agendamentos = this.paginationService.changePage(this.allAgendamentos)
  }
  
  onSort(column: any) {
    this.agendamentos = this.paginationService.onSort(column, this.agendamentos)
  }

  exibeAtualizarStatus(agendamento: Agendamento) {
    const hoje = new Date();
    const data = new Date(agendamento.data);

    return agendamento.status === StatusAgendamento.Aberto && data < hoje;
  }

  enviarEmail(agendamento: Agendamento) {
    const request: EmailNoShowRequest = {
      idAgendamento: agendamento.id,
      data: agendamento.data,
      emailCliente: agendamento.email,
      nomeCliente: agendamento.nome,
      observacoes: agendamento.observacoes,
      whatsAppCliente: agendamento.telefone
    };

    this.agendamentoService.sendEmailNoShow(request).subscribe({
      next: response => {
          Swal.fire({
              title: 'Email enviado com sucesso!',
              icon: 'success',
              timer: 2000,
              timerProgressBar: true
          });
      },
      error: error => {
          Swal.fire({
              title: 'Falha ao enviar email!',
              text: error.message,
              icon: 'error'
          });
      }
  });
  }

  confirmarComparecimento(agendamento: Agendamento){
      var request: UpdateStatusAgendamentoRequest = {
          id: agendamento.id,
          status: StatusAgendamento.Compareceu
      }

      this.atualizarStatus(request, agendamento);
  }

  confirmarNaoComparecimento(agendamento: Agendamento){
      var request: UpdateStatusAgendamentoRequest = {
          id: agendamento.id,
          status: StatusAgendamento.NaoCompareceu
      }

      this.atualizarStatus(request, agendamento);
  }

  private atualizarStatus(request: any, agendamento: Agendamento){
      this.calendarioService.updateStatus(request).subscribe({
          next: response => {
              Swal.fire({
                  title: 'Status de agendamento atualizado com sucesso!',
                  icon: 'success',
                  timer: 2000,
                  timerProgressBar: true
              }).then((result) => {
                    const index = this.allAgendamentos.indexOf(agendamento);
                    this.allAgendamentos.splice(index, 1);
                    this.allAgendamentos = [...this.allAgendamentos]
                    this.changePage();
              });
          },
          error: error => {
              Swal.fire({
                  title: 'Falha ao atualizar status de agendamento!',
                  text: error.message,
                  icon: 'error'
              });
          }
      });
  }

  mensagemWhatsappNaoCompareceu(agendamento: Agendamento): string {
    const dataFormatada = new Date(agendamento.data).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });    

    return encodeURIComponent(
      `Olá, ${agendamento.nome}.\n\nSomos da *${this.nomeOficina}*. ` +
      `Notamos que você não pôde comparecer ao seu agendamento de manutenção automotiva em ${dataFormatada}. ` +
      `Entendemos que imprevistos acontecem e gostaríamos de oferecer a oportunidade de reagendar em um momento mais conveniente para você.`
    );
  }

  isStatusAgendamentosNaoCompareceu(status: StatusAgendamento): boolean {
     return status === StatusAgendamento.NaoCompareceu;
  }
}