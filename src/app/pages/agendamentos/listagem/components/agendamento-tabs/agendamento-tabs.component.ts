import { Component, EventEmitter, Output } from "@angular/core";
import { NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-agendamento-tabs',
    templateUrl: './agendamento-tabs.component.html'
  })
  

export class AgendamentoTabsComponent {
    @Output() setSelectedTab = new EventEmitter<number>();

    onNavChange(changeEvent: NgbNavChangeEvent) {
        this.setSelectedTab.emit(changeEvent.nextId);
    }
}