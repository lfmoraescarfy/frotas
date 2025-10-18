import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { ParametrosService } from "../../services/parametros.service";
import { TokenStorageService } from "src/app/core/services/token-storage.service";
import { Usuario } from "src/app/core/models/usuario.model";
import { Empresa } from "../../models/empresa.model";
import { UpdateDadosEmpresaRequest } from "../../models/requests/update-dados-empresa.request";
import { Endereco } from "src/app/core/models/endereco.model";

@Component({
    selector: 'app-dados-empresa',
    templateUrl: './dados-empresa.component.html'
  })
  export class DadosEmpresaComponent implements OnInit {
    formDados!: UntypedFormGroup;
    submitted: boolean = false;

    empresa!: Empresa;
    endereco!: Endereco;
    
    constructor(
        private formBuilder: UntypedFormBuilder,
        private parametrosService: ParametrosService,
        private tokenStorageService : TokenStorageService,
    ) { }

    ngOnInit(): void {
        this.carregarFormulario();
        this.carregarDados();
    }

    get form(){
        return this.formDados.controls;
    }
    
    setEndereco(endereco: Endereco){
        this.endereco = endereco;
    }

    carregarFormulario(){
        this.formDados = this.formBuilder.group({
            nome: [null, [Validators.required]],
            razaoSocial: [null, [Validators.required]],
            cnpj: [null],
            inscricaoMunicipal: [null],
            email: [null, [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
            telefone: [null],
            whatsApp: [null]
        });
    }

    carregarDados(){
        const usuario: Usuario = this.tokenStorageService.getUser();

        this.parametrosService.get(usuario.idEmpresa).subscribe((response) => {
            this.empresa = response;
            this.endereco = {
                cep: response.cep,
                uf: response.uf,
                localidade: response.cidade,
                bairro: response.bairro,
                logradouro: response.logradouro,
                numero: response.numero,
                complemento: response.complemento
            };

            this.popularFormulario();
        });
    }

    popularFormulario(){
        if(this.empresa){
            this.formDados.patchValue({
                nome: this.empresa.nome,
                razaoSocial: this.empresa.razaoSocial,
                cnpj: this.empresa.cnpj,
                email: this.empresa.email,
                telefone: this.empresa.telefone,
                whatsApp: this.empresa.whatsApp
            });
        }
    }

    salvar() {
        this.submitted = true;
        
        if(this.formDados.valid) {

        const request: UpdateDadosEmpresaRequest = {
            id: this.empresa.id,
            nome: this.form['nome'].value,
            razaoSocial: this.form['razaoSocial'].value,
            cnpj: this.form['cnpj'].value,
            email: this.form['email'].value,
            telefone: this.form['telefone'].value,
            whatsApp: this.form['whatsApp'].value,
            uf: this.endereco?.uf,
            cidade: this.endereco?.localidade,
            cep: this.endereco?.cep,
            bairro: this.endereco?.bairro,
            logradouro: this.endereco?.logradouro,
            numero: this.endereco?.numero,
            complemento: this.endereco?.complemento
        };

        this.parametrosService.update(request).subscribe({
            next: response => {
                if(response) {
                    Swal.fire({
                        title: 'Dados da empresa atualizados com sucesso!',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true
                    });
                    
                    this.submitted = false;
                }
            },
            error: error => {
                let text = error.message;
    
                if(error.status == 400){
                    text = error.error.message;
                }
    
                Swal.fire({
                    title: 'Falha ao atualizar dados da empresa!',
                    text: text,
                    icon: 'error'
                });
            }
          });
        }
    }
}