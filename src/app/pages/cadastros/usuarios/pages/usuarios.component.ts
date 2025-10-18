import { Component } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})

export class UsuariosComponent {
  breadCrumbItems!: Array<{}>;
  content?: any;
  usuarios: any[] = [];
  allUsuarios: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Cadastros' },
      { label: 'Usuários', active: true }
    ];
  }

  setAllUsuarios(value: any){
    this.allUsuarios = value;
  }

  setUsuarios(value: any){
    this.usuarios = value;
  }

  addUsuario(value: any) {
    this.allUsuarios.push(value);
    this.allUsuarios = [...this.allUsuarios];
    
    this.usuarios.push(value);
    this.usuarios = [...this.usuarios];
  }
}
