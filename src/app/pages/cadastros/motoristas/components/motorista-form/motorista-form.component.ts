import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import Swal from "sweetalert2";
import { Usuario } from "src/app/core/models/usuario.model";
import { MotoristasService } from "../../services/motorista.service";

@Component({
    selector: 'app-motorista-form',
    templateUrl: 'motorista-form.component.html'
  })
export class MotoristaFormComponent {
    @Input() modal: any;
    @Input() motorista: any;
    @Output() onAddMotorista = new EventEmitter<Usuario>();

    submitted = false;
    title: string = 'Adicionar Motorista';
    formMotorista!: UntypedFormGroup;
    perfis: any[] = [];

    constructor(
        private formBuilder: UntypedFormBuilder,
        private service: MotoristasService) { }

    ngOnInit(): void {
        this.carregarFormulario();

        this.formMotorista.controls.senha.valueChanges.subscribe(() => {
            this.formMotorista.controls.confirmaSenha.updateValueAndValidity();
        });
    }

    get form() {
        return this.formMotorista.controls;
    }

    carregarFormulario() {
        this.formMotorista = this.formBuilder.group({
            id: [''],
            nome: ['', [Validators.required]],
            cpf: [''],
            cnh: [''],
            contato: ['']
        });

        if(this.motorista){
            this.title = 'Editar Motorista';

            setTimeout(()=>{     
              this.formMotorista = this.formBuilder.group({
                id: [this.motorista.id],
                nome: [this.motorista.nome, [Validators.required]],
                cpf: [this.motorista.cpf],
                cnh: [this.motorista.cnh],
                contato: [this.motorista.contato],
              });
            }, 200);
        }
    }

    salvar() {
        this.submitted = true

        if (this.formMotorista.valid) {
            const request = this.formMotorista.value;

            if (this.formMotorista.get('id')?.value) {
                this.service.update(request).pipe().subscribe({
                    next: response => {
                        Swal.fire({
                            title: 'Motorista atualizado com sucesso!',
                            icon: 'success',
                            timer: 2000,
                            timerProgressBar: true
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
                                this.modal.close(response);;
                            }
                        });
                    },
                    error: error => {
                        Swal.fire({
                            title: 'Falha ao atualizar motorista!',
                            text: error.message,
                            icon: 'error'
                        });
                    }
                });
            }
            else {
                this.service.create(request).pipe().subscribe({
                    next: response => {

                        if(response){
                            this.onAddMotorista.emit(response);
                            Swal.fire({
                                title: 'Motorista inserido com sucesso!',
                                icon: 'success',
                                timer: 2000,
                                timerProgressBar: true
                            }).then((result) => {
                                if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
                                    this.modal.close(response);;
                                }
                            });
                        }
                    },
                    error: error => {
                        Swal.fire({
                            title: 'Falha ao inserir motorista!',
                            text: error.message,
                            icon: 'error'
                        });
                    }
                });
            }
        }
    }
}