import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { PaginationService } from "src/app/core/services/pagination.service";
import Swal from "sweetalert2";
import { FrotasService } from "../../services/frota.service";
import { Veiculo } from "../../../veiculos/models/veiculo.model";

@Component({
    selector: 'app-frota-grid',
    templateUrl: 'frota-grid.component.html'
  })
export class FrotaGridComponent implements OnChanges {
    @Input() allVeiculos: Veiculo[] = [];
    @Input() veiculos: Veiculo[] = [];

    veiculoEdit: any;

    constructor(
      public paginationService: PaginationService,
      private service: FrotasService) {}

    ngOnChanges(changes: SimpleChanges): void {
      if(changes.veiculos.currentValue.length > 0){
        this.paginationService.init(changes.veiculos.currentValue);
      }
    }

    changePage() {
      this.veiculos = this.paginationService.changePage(this.allVeiculos)
    }
    
    onSort(column: any) {
      this.veiculos = this.paginationService.onSort(column, this.veiculos)
    }

    delete(veiculo: any){
      Swal.fire({
        title: 'Atenção!',
        text: 'Confirma a remoção do veículo da frota?',
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if(result.isConfirmed){
          this.service.delete(veiculo.id).pipe().subscribe({
              next: response => {
                Swal.fire({
                  title: 'Veículo removido com sucesso!',
                  icon: 'success',
                  timer: 2000,
                  timerProgressBar: true
                }).then((result) => {
                  if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
                    const index = this.allVeiculos.indexOf(veiculo);
                    this.allVeiculos.splice(index, 1);
                    this.allVeiculos = [...this.allVeiculos]
                    this.changePage();
                  }
                });
              },
              error: error => {
                Swal.fire({
                    title: 'Falha ao remover Veículo!',
                    text: error.message,
                    icon: 'error'
                });
              }
          });
        }
      });
    }

    getLogo(marca: string): string {
      switch (marca.toLowerCase()) {
        case 'fiat':
          return 'assets/images/marcas/fiat.png';
        case 'volkswagen':
          return 'assets/images/marcas/volkswagen.png';
        case 'chevrolet':
          return 'assets/images/marcas/chevrolet.png';
        case 'ford':
          return 'assets/images/marcas/ford.png';
        case 'toyota':
          return 'assets/images/marcas/toyota.png';
        case 'honda':
          return 'assets/images/marcas/honda.png';
        case 'porsche':
          return 'assets/images/marcas/porsche.png';
        case 'jeep':
          return 'assets/images/marcas/jeep.png';
        case 'kia':
        case 'kiamotors':
          return 'assets/images/marcas/kia.png';
        case 'hyundai':
          return 'assets/images/marcas/hyundai.png';
        case 'nissan':
          return 'assets/images/marcas/nissan.png';
        case 'renault':
          return 'assets/images/marcas/renault.png';
        case 'peugeot':
          return 'assets/images/marcas/peugeot.png';
        case 'citroen':
          return 'assets/images/marcas/citroen.png';
        case 'mercedes':
        case 'mercedesbenz':
        case 'mercedes benz':
        case 'mercedes-benz':
          return 'assets/images/marcas/mercedes.png';
        case 'bmw':
          return 'assets/images/marcas/bmw.png';
        case 'audi':
          return 'assets/images/marcas/audi.png';
        case 'volvo':
          return 'assets/images/marcas/volvo.png';
        case 'mitsubishi':
          return 'assets/images/marcas/mitsubishi.png';
        case 'subaru':
          return 'assets/images/marcas/subaru.png';
        case 'land rover':
        case 'landrover':
          return 'assets/images/marcas/land.png';
        case 'jaguar':
          return 'assets/images/marcas/jaguar.png';
        case 'tesla':
          return 'assets/images/marcas/tesla.png';
        case 'chery':
        case 'caoachery':
          return 'assets/images/marcas/chery.png';
        case 'ram':
          return 'assets/images/marcas/ram.png';
        case 'dodge':
          return 'assets/images/marcas/dodge.png';
        case 'chrysler':
          return 'assets/images/marcas/chrysler.png';
        case 'mini':
          return 'assets/images/marcas/mini.png';
        case 'alfa romeo':
        case 'alfa':
          return 'assets/images/marcas/alfa.png';
        case 'lamborghini':
          return 'assets/images/marcas/lamborghini.png';
        case 'ferrari':
          return 'assets/images/marcas/ferrari.png';
        case 'maserati':
          return 'assets/images/marcas/maserati.png';
        case 'bugatti':
          return 'assets/images/marcas/bugatti.png';
        case 'scania':
          return 'assets/images/marcas/scania.png';
        case 'byd':
          return 'assets/images/marcas/byd.png';
        default:
          return ''; // Imagem padrão para marcas desconhecidas
      }
    }
}