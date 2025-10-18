import { Component, Input, OnInit } from "@angular/core";
import { UpdateAgendamentoRequest } from "../../models/requests/update-agendamento.request";
import { CalendarioService } from "../../services/calendario.service";
import Swal from "sweetalert2";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UpdateStatusAgendamentoRequest } from "../../models/requests/update-status-agendamento.request";
import { StatusAgendamento } from "../../enums/status-agendamento.enum";

@Component({
    selector: 'app-agendamento-view',
    templateUrl: './agendamento-view.component.html'
  })
export class AgendamentoViewComponent implements OnInit {
    @Input() agendamento: any;
    @Input() modal: any;
    title!: string;

    constructor(
        private modalService: NgbModal, 
        private service: CalendarioService){ }

    ngOnInit(): void {
        this.title = this.agendamento.title;
    }

    excluirAgendamento() {
        let request: UpdateAgendamentoRequest = {
          id: this.agendamento.id 
        }
    
        this.service.update(request).subscribe({
            next: response => {
                Swal.fire({
                    title: 'Agendamento excluído com sucesso!',
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true
                }).then((result) => {
                      this.agendamento.remove();
                      this.modalService.dismissAll();
                });
            },
            error: error => {
                Swal.fire({
                    title: 'Falha ao excluir agendamento!',
                    text: error.message,
                    icon: 'error'
                });
            }
        });
    }

    confirmarExclusao() {
        Swal.fire({
          title: 'Confirma a exclusão do agendamento?',
          text: 'Esta operação não poderá ser desfeita!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#34c38f',
          cancelButtonColor: '#f46a6a',
          confirmButtonText: 'Sim!',
          cancelButtonText: 'Não'
        }).then((result) => {
          if (result.value) {
            this.excluirAgendamento();
          }
        });
    }

    showExcluir(){
        let hoje = new Date();
        return this.agendamento.start > hoje;
    }

    showConfirmacaoStatus(){
        const hoje = new Date();
        return this.agendamento.start < hoje;
    }

    confirmarComparecimento(){
        var request: UpdateStatusAgendamentoRequest = {
            id: this.agendamento.id,
            status: StatusAgendamento.Compareceu
        }

        this.atualizarStatus(request);
    }

    confirmarNaoComparecimento(){
        var request: UpdateStatusAgendamentoRequest = {
            id: this.agendamento.id,
            status: StatusAgendamento.NaoCompareceu
        }

        this.atualizarStatus(request);
    }

    private atualizarStatus(request: any){
        this.service.updateStatus(request).subscribe({
            next: response => {
                Swal.fire({
                    title: 'Status de agendamento atualizado com sucesso!',
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true
                }).then((result) => {
                      this.agendamento.remove();
                      this.modalService.dismissAll();
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
}