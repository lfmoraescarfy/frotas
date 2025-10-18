import { Component } from '@angular/core';

@Component({
  selector: 'app-frota',
  templateUrl: './frota.component.html'
})

export class FrotaComponent {
  breadCrumbItems!: Array<{}>;
  content?: any;
  veiculos: any[] = [];
  allVeiculos: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Cadastros' },
      { label: 'Frota', active: true }
    ];
  }

  setAllVeiculos(value: any){
    this.allVeiculos = value;
  }

  setVeiculos(value: any){
    this.veiculos = value;
  }

  addVeiculo(value: any) {
    this.allVeiculos.push(value);
    this.allVeiculos = [...this.allVeiculos];
    
    this.veiculos.push(value);
    this.veiculos = [...this.veiculos];
  }
}
