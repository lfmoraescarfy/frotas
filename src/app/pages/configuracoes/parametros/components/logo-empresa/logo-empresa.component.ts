import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "src/app/core/services/token-storage.service";
import { ParametrosService } from "../../services/parametros.service";
import { Usuario } from "src/app/core/models/usuario.model";
import Swal from "sweetalert2";
import { LogoEmpresaResponse } from "../../models/responses/logo-empresa.response";

@Component({
    selector: 'app-logo-empresa',
    templateUrl: './logo-empresa.component.html'
  })
  export class LogoEmpesaComponent implements OnInit {
    logo!: File;
    dados!: LogoEmpresaResponse;

    constructor(
        private tokenStorageService : TokenStorageService,
        private parametrosService: ParametrosService
    ) { }

    ngOnInit(): void {
        this.carregarDados();
    }

    carregarDados() {
        const usuario: Usuario = this.tokenStorageService.getUser();

        this.parametrosService.getLogo(usuario.idEmpresa).subscribe((response) => {
            this.dados = response;
        });
    }

    getLogo() {
        var def = 'assets/images/users/user-dummy-img.jpg';
    
        if(this.logo)
          return URL.createObjectURL(this.logo);
    
        if(this.dados && this.dados.logo)
          def = this.dados.logo;
    
        return def;
    }
    
    getNome() {
        return this.dados ? this.dados.nome : '';
    }

    getCnpj() {
        return this.dados ? this.dados.cnpj : '';
    }

    logoAlterada(event: any) {
        this.logo = event.target.files[0];
        this.salvar();
    }

    salvar() {
        const request = new FormData();
        request.append('IdEmpresa', this.dados.id);
        request.append('Logo', this.logo);

        this.parametrosService.updateLogo(request).subscribe({
            next: response => {
                if(response) {
                    Swal.fire({
                        title: 'Logo da empresa atualizada com sucesso!',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true
                    });
                }
            },
            error: error => {
                let text = error.message;
    
                if(error.status == 400){
                    text = error.error.message;
                }
    
                Swal.fire({
                    title: 'Falha ao atualizar logo da empresa!',
                    text: text,
                    icon: 'error'
                });
            }
        });
    }
  }