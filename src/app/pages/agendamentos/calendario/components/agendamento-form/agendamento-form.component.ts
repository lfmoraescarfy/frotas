import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import Swal from "sweetalert2";
import { CalendarioService } from "../../services/calendario.service";
import { TokenStorageService } from "src/app/core/services/token-storage.service";
import { Agendamento } from "../../models/agendamento.model";
import { StatusAgendamento } from "../../enums/status-agendamento.enum";

@Component({
    selector: 'app-agendamento-form',
    templateUrl: 'agendamento-form.component.html'
  })
export class AgendamentoFormComponent {
    @Input() modal: any;
    @Input() event: any;
    @Output() onCreateAgendamento = new EventEmitter<Agendamento>();

    horarios: string[] = [];
    idOficina!: string;
    submitted = false;
    formAgendamento!: UntypedFormGroup;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private service: CalendarioService,
        private tokenStorageService: TokenStorageService) { }

    ngOnInit(): void {
        let usuario =  this.tokenStorageService.getUser();
        this.idOficina = usuario.idOficina;

        this.carregarFormulario();
        this.carregarHorariosLivres();
    }

    get form() {
        return this.formAgendamento.controls;
    }

    carregarHorariosLivres(){
        let request = {
          idOficina: this.idOficina,
          data: this.event.startStr
        };
    
        this.service.getHorariosLivresByDate(request).subscribe((response) => {
          this.horarios = response;
        });
    }

    carregarFormulario() {
        this.formAgendamento = this.formBuilder.group({
            idOficina: [this.idOficina],
            data: [this.event.start],
            hora: [null, [Validators.required]],
            nomeCliente: [null, [Validators.required]],
            emailCliente: [null, [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
            whatsAppCliente: [null, [Validators.required]],
            observacoes: [null],
        });
    }


    salvar() {
        this.submitted = true
        if (this.formAgendamento.valid) {
            const request = this.formAgendamento.value;

            this.service.create(request).pipe().subscribe({
                next: response => {
                    let model: Agendamento = {
                        id: response.id,
                        data: response.dataInicio,
                        nome: response.nomeCliente,
                        email: response.emailCliente,
                        telefone: response.whatsAppCliente,
                        observacoes: response.observacoes,
                        status: StatusAgendamento.Aberto
                    };

                    this.onCreateAgendamento.emit(model);

                    Swal.fire({
                        title: 'Agendamento realizado com sucesso!',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
                            this.modal.dismiss();
                        }
                    });
                },
                error: error => {
                    Swal.fire({
                        title: 'Falha ao criar agendamento!',
                        text: error.message,
                        icon: 'error'
                    });
                }
            });
        }
    }
}