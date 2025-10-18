import { Component, EventEmitter, Output } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-motorista-header',
    templateUrl: './motorista-header.component.html'
  })
  
export class MotoristaHeaderComponent {
    @Output() addMotorista: EventEmitter<any> = new EventEmitter()

    constructor(private modalService: NgbModal) {}

    openModal(content: any) {
        const modalRef = this.modalService.open(content, { size: 'lg', centered: true });
        modalRef.result.then((data: any) => {
            this.addMotorista.emit(data);
          }
        );
    }
}