import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Empresa } from "../../models/empresa.model";
import { ParametrosService } from "../../services/parametros.service";
import Swal from "sweetalert2";
import { UpdateParametrosEmpresaRequest } from "../../models/requests/update-parametros-empesa.request";
import { TokenStorageService } from "src/app/core/services/token-storage.service";
import { Usuario } from "src/app/core/models/usuario.model";

@Component({
    selector: 'app-parametros-empresa',
    templateUrl: './parametros-empresa.component.html'
  })
export class ParametrosEmpresaComponent implements OnInit {
    empresa!: Empresa;
    formParametros!: UntypedFormGroup;
    submitted: boolean = false;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private parametrosService: ParametrosService,
        private tokenStorageService : TokenStorageService){}

    ngOnInit(): void {
        this.carregarFormulario();
        this.carregarDados();
    }

    get form(){
        return this.formParametros.controls;
    }

    carregarFormulario(){
        this.formParametros = this.formBuilder.group({
            idEmpresa: [null],
        });
    }

    carregarDados(){
        const usuario: Usuario = this.tokenStorageService.getUser();

        this.parametrosService.get(usuario.idEmpresa).subscribe((response) => {
            this.empresa = response;
            this.popularFormulario();
        });
    }

    popularFormulario(){
        if(this.empresa){
            this.formParametros.patchValue({
                idEmpresa: this.empresa.id,
            });
        }
    }

    salvar(){
        this.submitted = true;
        if(this.formParametros.valid){


            const request: UpdateParametrosEmpresaRequest = {
                id: this.empresa.id,

            }

            this.parametrosService.updateParametros(request).subscribe({
                next: response => {
                    Swal.fire({
                        title: 'Parâmetros da empresa atualizados com sucesso!',
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
                        title: 'Falha ao atualizar parâmetros da empresa!',
                        text: text,
                        icon: 'error'
                    });
                }
            });
        }
    }
}