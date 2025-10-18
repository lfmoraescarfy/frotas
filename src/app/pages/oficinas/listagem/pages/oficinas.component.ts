import { Component } from '@angular/core';
import { Oficina } from '../models/oficina.model';

@Component({
  selector: 'app-oficinas',
  templateUrl: './oficinas.component.html'
})

export class OficinasComponent {
  breadCrumbItems!: Array<{}>;
  content?: any;
  oficinas: Oficina[] = [];
  allOficinas: Oficina[] = [];
  selectedTab: number = 1;

searchTerm: string = '';

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Oficinas' },
      { label: 'Listagem', active: true }
    ];
  }

  setAllOficinas(value: any){
    this.allOficinas = value;
  }

  setOficinas(value: any){
    this.allOficinas = [...value];
  }

  setSelectedTab(value: number) {
    this.selectedTab = value;
  }

  followClick(event: any){}
  companydetail(event: any) {}
  changePage(){}
  performSearch(){}
}
