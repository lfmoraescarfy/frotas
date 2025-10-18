import { Component } from '@angular/core';

@Component({
  selector: 'app-motoristas',
  templateUrl: './motoristas.component.html'
})

export class MotoristasComponent {
  breadCrumbItems!: Array<{}>;
  content?: any;
  motoristas: any[] = [];
  allMotoristas: any[] = [];

  constructor() { }           

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Cadastros' },
      { label: 'Motoristas', active: true }
    ];
  }

  setAllMotoristas(value: any){
    this.allMotoristas = value;
  }

  setMotoristas(value: any){
    this.motoristas = value;
  }

  addMotorista(value: any) {
    this.allMotoristas.push(value);
    this.allMotoristas = [...this.allMotoristas];
    
    this.motoristas.push(value);
    this.motoristas = [...this.motoristas];
  }
}
