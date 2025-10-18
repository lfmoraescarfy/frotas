import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FrotasService } from "../../services/frota.service";
import Swal from "sweetalert2";
import { Veiculo } from "../../../veiculos/models/veiculo.model";

@Component({
    selector: 'app-frota-header',
    templateUrl: './frota-header.component.html',
  })
  
export class FrotaHeaderComponent {
    @Input() veiculos: Veiculo[] = [];
    @Output() addVeiculo: EventEmitter<any> = new EventEmitter()

    constructor(
        private modalService: NgbModal,
        private service: FrotasService) {}

    openModal(content: any) {
        const modalRef = this.modalService.open(content, { size: 'lg', centered: true });

        modalRef.result.then((data: any) => {
                this.addVeiculo.emit(data);
            }
        ).catch((reason: any) => {
            // Modal dismissed, no action needed
        });
    }
    
    importFile(event: any) {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('arquivo', file, file.name);

            this.service.import(formData).subscribe({
                next: response => {
                    if(response) {
                        Swal.fire({
                            title: 'Importação de frota realizada com sucesso!',
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
                        title: 'Falha ao importar frota da empresa!',
                        text: text,
                        icon: 'error'
                    });
                }
            });
        } 
    }
}