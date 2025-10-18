import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PaginationService } from "src/app/core/services/pagination.service";
import Swal from "sweetalert2";
import { MotoristasService } from "../../services/motorista.service";

@Component({
    selector: 'app-motorista-grid',
    templateUrl: 'motorista-grid.component.html'
  })
export class MotoristaGridComponent implements OnChanges {
    @Input() allMotoristas: any[] = [];
    @Input() motoristas: any[] = [];
    motoristaEdit: any;

    constructor(
      public paginationService: PaginationService,
      private modalService: NgbModal,
      private service: MotoristasService) {}

    ngOnChanges(changes: SimpleChanges): void {
      if(changes.motoristas.currentValue.length > 0){
        this.paginationService.init(changes.motoristas.currentValue);
      }
    }
    
    changePage() {
      this.motoristas = this.paginationService.changePage(this.allMotoristas)
    }
    
    onSort(column: any) {
      this.motoristas = this.paginationService.onSort(column, this.motoristas)
    }
    
    openModal(content: any, index: any) {
      this.motoristaEdit = this.motoristas[index];
      const modalRef = this.modalService.open(content, { size: 'lg', centered: true })
      modalRef.result.then((data: any) => {
          const index = this.allMotoristas.indexOf(this.motoristaEdit);
          this.allMotoristas[index] = data;
          this.changePage();
        }
      );
    }

    delete(motorista: any){
      Swal.fire({
        title: 'Atenção!',
        text: 'Confirma a remoção do motorista?',
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.delete(motorista.id).pipe().subscribe({
            next: () => {
              Swal.fire({
                title: 'Motorista removido com sucesso!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true
              }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
                  const index = this.allMotoristas.indexOf(motorista);
                  this.allMotoristas.splice(index, 1);
                  this.allMotoristas = [...this.allMotoristas]
                  this.changePage();
                }
              });
            },
            error: (error: { message: any; }) => {
              Swal.fire({
                  title: 'Falha ao remover usuário!',
                  text: error.message,
                  icon: 'error'
              });
            }
        });
        }
      });
    }

    addMotorista(motorista: any){
      this.allMotoristas.push(motorista);
      this.changePage();
    }
}