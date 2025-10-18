import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { UsuarioService } from "../../services/usuario.service";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import Swal from "sweetalert2";
import { PerfilEnum, PerfilLabel } from "src/app/shared/enums/perfil.enum";
import { PasswordValidator } from "src/app/shared/validators/password.validator";
import { Usuario } from "src/app/core/models/usuario.model";

@Component({
    selector: 'app-usuario-form',
    templateUrl: 'usuario-form.component.html'
  })
export class UsuarioFormComponent {
    @Input() modal: any;
    @Input() usuario: any;
    @Output() onAddUsuario = new EventEmitter<Usuario>();

    submitted = false;
    title: string = 'Adicionar Usuário';
    formUsuario!: UntypedFormGroup;
    perfis: any[] = [];

    constructor(
        private formBuilder: UntypedFormBuilder,
        private service: UsuarioService) { }

    ngOnInit(): void {
        this.perfis = [
            { value: PerfilEnum.Administrador, label: PerfilLabel.get(PerfilEnum.Administrador) },
            { value: PerfilEnum.Consultor, label: PerfilLabel.get(PerfilEnum.Consultor) },
            { value: PerfilEnum.Mecanico, label: PerfilLabel.get(PerfilEnum.Mecanico) }
        ];

        this.carregarFormulario();

        this.formUsuario.controls.senha.valueChanges.subscribe(() => {
            this.formUsuario.controls.confirmaSenha.updateValueAndValidity();
        });
    }

    get form() {
        return this.formUsuario.controls;
    }

    carregarFormulario() {
        this.formUsuario = this.formBuilder.group({
            id: [''],
            perfis: ['', [Validators.required]],
            cpf: ['', [Validators.required]],
            nome: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
            senha: ['', [Validators.required]],
            confirmaSenha: ['', [Validators.required, PasswordValidator.match('senha')]]
        });

        if(this.usuario){
            this.title = 'Editar Usuário';

            setTimeout(()=>{     
              this.formUsuario = this.formBuilder.group({
                id: [this.usuario.id],
                perfis: [this.usuario.perfis, [Validators.required]],
                cpf: [this.usuario.cpf, [Validators.required]],
                nome: [this.usuario.nome, [Validators.required]],
                email: [this.usuario.email, [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
              });
            }, 200);
        }
    }

    salvar() {
        this.submitted = true

        if (this.formUsuario.valid) {
            const request = this.formUsuario.value;

            if (this.formUsuario.get('id')?.value) {
                this.service.update(request).pipe().subscribe({
                    next: response => {
                        Swal.fire({
                            title: 'Usuário atualizado com sucesso!',
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
                            title: 'Falha ao atualizar usuário!',
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
                            this.onAddUsuario.emit(response);
                            Swal.fire({
                                title: 'Usuário inserido com sucesso!',
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
                            title: 'Falha ao inserir usuário!',
                            text: error.message,
                            icon: 'error'
                        });
                    }
                });
            }
        }
    }
}