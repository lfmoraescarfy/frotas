import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { CepService } from "src/app/core/services/cep.service";
import { Endereco } from "src/app/core/models/endereco.model";
import { UfEnum } from "../../enums/uf.enum";

@Component({
    selector: 'app-endereco',
    templateUrl: './endereco.component.html'
  })
  export class EnderecoComponent implements OnInit, OnChanges {
    @Input() endereco!: Endereco;
    @Output() onChangeEndereco = new EventEmitter<Endereco>();

    formEndereco!: UntypedFormGroup;
    ufs: any[] = [];
    cidades: any[] = [];
    carregando = false;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private cepService: CepService
    ){}

    ngOnInit(): void {
        this.carregando = true;
        this.carregarFormulario();
        this.ufs = Object.values(UfEnum);
        this.carregarCidades();
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.endereco !== null && changes.endereco.currentValue !== null && this.carregando) {
            this.carregarEndereco();
            this.carregando = false;
        }
    }

    get form(){
        return this.formEndereco.controls;
    }

    onChange(event: any){
    }

    carregarCidades(){
        this.cidades = [];
        this.cepService.getCidades().subscribe(response => this.cidades = response);
    }

    carregarEndereco(){
        if(this.endereco){
            this.formEndereco.patchValue({
                cep: this.endereco.cep,
                logradouro: this.endereco.logradouro,
                numero: this.endereco.numero,
                bairro: this.endereco.bairro,
                complemento: this.endereco.complemento,
                uf: this.endereco.uf,
                localidade: this.endereco.localidade
            });  
        }
    }

    carregarFormulario(){
        this.formEndereco = this.formBuilder.group({
            cep: [null],     
            logradouro: [null],
            numero: [null],
            bairro: [null],
            complemento: [null],
            uf: [null],
            localidade: [null] 
        });

        this.formEndereco.valueChanges.subscribe((values) => {
            this.onChangeEndereco.emit(values);
        });
    }

    limparEndereco(){
        this.form['logradouro'].setValue(null);
        this.form['bairro'].setValue(null);
        this.form['uf'].setValue(null);
        this.form['localidade'].setValue(null);
    }

    procurarEndereco(){
        this.limparEndereco();
    
        let cep = this.form['cep'].value;
    
        if(cep != undefined && cep != null && cep != ""){
          this.cepService.getEndereco(cep).subscribe((response) => {  
                this.form['uf'].setValue(response.uf);  
                this.form['localidade'].setValue(response.localidade);
                this.form['logradouro'].setValue(response.logradouro);
                this.form['bairro'].setValue(response.bairro);
          });
        }
    }
}