import { take } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import Swal from "sweetalert2";
import { FrotasService } from "../../services/frota.service";
import { Veiculo } from "../../../veiculos/models/veiculo.model";
import { VeiculosService } from "../../../veiculos/services/veiculos.service";
import { placaBrasilValidator } from 'src/app/shared/validators/placa-br.validator';

@Component({
    selector: 'app-frota-form',
    templateUrl: 'frota-form.component.html',
  })
export class FrotaFormComponent {
    @Input() modal: any;
    @Input() veiculo: any;
    @Output() onAddVeiculo = new EventEmitter<Veiculo>();

    submitted = false;
    mostrarDetalhes = false;
    title: string = 'Adicionar Veículo';
    formVeiculo!: UntypedFormGroup;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private service: VeiculosService,
        private frotaService: FrotasService) { }

    ngOnInit(): void {
        this.carregarFormulario();
    }

    get form() {
        return this.formVeiculo.controls;
    }

    carregarFormulario() {
        this.formVeiculo = this.formBuilder.group({
        id: [null],
        placa: ['', [placaBrasilValidator()]],
        marca: [{ value: null, disabled: true }],
        modelo: [{ value: null, disabled: true }],
        cor: [{ value: null, disabled: true }],
        anoModelo: [{ value: null, disabled: true }],
        anoFabricacao: [{ value: null, disabled: true }]
    });
    }

    carregarDados(){
        if(this.veiculo != null){
            this.mostrarDetalhes = true;
            let modelo = `${this.veiculo.marca} ${this.veiculo.modelo} (${this.veiculo.anoFabricacao} / ${this.veiculo.anoModelo}) - ${this.veiculo.cor}`;

            this.formVeiculo.patchValue({
                id: this.veiculo.id,
                placa: this.veiculo.placa,
                modelo: modelo
            });
        } else {
            this.mostrarDetalhes = false;
            this.carregarFormulario();
        }
    }

    buscar() {
        this.service.getByPlaca(this.formVeiculo.value.placa).pipe(take(1)).subscribe({
            next: (response: Veiculo) => {
                this.veiculo = response;
                this.carregarDados();
            },
            error: (error: { message: any; }) => {
                Swal.fire({
                    title: 'Veículo não encontrado!',
                    text: error.message,
                    icon: 'error',
                });
            }
        });
    }

    salvar(): void {
        this.submitted = true;
        if (this.formVeiculo.invalid) return;
    
        const request = {
          ...this.formVeiculo.value
        };
    
        this.frotaService.add(request.id).pipe(take(1)).subscribe({
          next: (response: Veiculo) => {
            if (!request.id) this.onAddVeiculo.emit(response);
    
            Swal.fire({
              title:'Veículo adicionado à frota com sucesso!',
              icon: 'success',
              timer: 2000,
              timerProgressBar: true,
            }).then(result => {
              if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
                this.modal.close(response);
              }
            });
          },
          error: (error: { message: any; }) => {
            Swal.fire({
              title: 'Falha ao adicionar Veículo à frota!',
              text: error.message,
              icon: 'error',
            });
          }
        });
    }
}