import { Component } from '@angular/core';
import { Agendamento } from '../../calendario/models/agendamento.model';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html'
})

export class AgendamentosComponent {
  breadCrumbItems!: Array<{}>;
  content?: any;
  agendamentos: Agendamento[] = [];
  allAgendamentos: Agendamento[] = [];
  selectedTab: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Agendamentos' },
      { label: 'Listagem', active: true }
    ];
  }

  setAllAgendamentos(value: any){
    this.allAgendamentos = value;
  }

  setAgendamentos(value: any){
    this.agendamentos = [...value];
  }

  setSelectedTab(value: number) {
    this.selectedTab = value;
  }
}
