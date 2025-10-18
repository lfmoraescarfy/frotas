import { Component, Input, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Usuario } from "src/app/core/models/usuario.model";
import { AuthenticationService } from "src/app/core/services/auth.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-perfil-dados-pessoais',
    templateUrl: './perfil-dados-pessoais.component.html'
  })
  export class PerfilDadosPessoaisComponent implements OnInit {
    @Input() usuario!: Usuario;
    @Input() fotoPerfil!: File;

    formPerfil!: UntypedFormGroup;
    submitted: boolean = false;
    
    constructor(
        private formBuilder: UntypedFormBuilder,
        private authService: AuthenticationService
    ){}

    ngOnInit(): void {
        this.carregarFormulario();
    }

    get form(){
        return this.formPerfil.controls;
    }

    carregarFormulario(){
        this.formPerfil = this.formBuilder.group({
          cpf: [this.usuario.cpf],
          nome: [this.usuario.nome, [Validators.required]],
          email: [this.usuario.email, [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        });
    }

    salvar(){
        this.submitted = true;
        
        if(this.formPerfil.valid){
          const request = new FormData();
          request.append('Id', this.usuario.id);
          request.append('Nome', this.form['nome'].value);
          request.append('Email', this.form['email'].value);
          request.append('Foto', this.fotoPerfil);

          this.authService.updateProfile(request).subscribe({
            next: response => {
                Swal.fire({
                    title: 'Perfil atualizado com sucesso!',
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
                    title: 'Falha ao atualizar perfil!',
                    text: text,
                    icon: 'error'
                });
            }
          });
        }
    }
}