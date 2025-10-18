import { Component, Input, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { UpdateSenhaRequest } from "src/app/core/models/requests/update-senha.request";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { PasswordValidator } from "src/app/shared/validators/password.validator";
import Swal from "sweetalert2";

@Component({
    selector: 'app-perfil-senha',
    templateUrl: './perfil-senha.component.html'
  })
  export class PerfilSenhaComponent implements OnInit {
    @Input() cpf!: string;
    formSenha!: UntypedFormGroup;
    submitted: boolean = false;
    
    constructor(
        private formBuilder: UntypedFormBuilder,
        private authService: AuthenticationService
    ){}

    ngOnInit(): void {
        this.carregarFormulario();
    }

    get form(){
        return this.formSenha.controls;
    }

    carregarFormulario(){
        this.formSenha = this.formBuilder.group({
          senhaAtual: [null, [Validators.required]],
          novaSenha: [null, [Validators.required]],
          confirmaSenha: [null, [Validators.required, PasswordValidator.match('novaSenha')]],
        });

        this.formSenha.controls.novaSenha.valueChanges.subscribe(() => {
            this.formSenha.controls.confirmaSenha.updateValueAndValidity();
        });
    }

    salvar(){
        this.submitted = true;
    
        if(this.formSenha.valid){
            let request: UpdateSenhaRequest = {
                cpf: this.cpf,
                senhaAtual: this.form['senhaAtual'].value,
                novaSenha: this.form['novaSenha'].value
            };
    
          this.authService.updatePassword(request).subscribe({
            next: response => {
                Swal.fire({
                    title: 'Senha atualizada com sucesso!',
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true
                });
    
                this.submitted = false;
            },
            error: error => {
                let text = error.message;
    
                if(error.status == 400){
                    text = error.error.message;
                }
    
                Swal.fire({
                    title: 'Falha ao atualizar senha!',
                    text: text,
                    icon: 'error'
                });
            }
          });
        }
    }
}