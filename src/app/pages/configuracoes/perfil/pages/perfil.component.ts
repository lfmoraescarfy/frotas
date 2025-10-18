import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../../core/services/token-storage.service';
import { PerfilLabel } from 'src/app/shared/enums/perfil.enum';
import { Usuario } from 'src/app/core/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {
  usuario!: Usuario;
  fotoPerfil!: File;
  
  constructor(
    private TokenStorageService : TokenStorageService) { }

  ngOnInit(): void {
    this.usuario =  this.TokenStorageService.getUser();
  }

  getPicture() {
    var def = 'assets/images/users/user-dummy-img.jpg';

    if(this.fotoPerfil)
      return URL.createObjectURL(this.fotoPerfil);

    if(this.usuario.foto)
      def = this.usuario.foto;

    return def;
  }

  getPerfil(){
    const descricaoPerfis = this.usuario.perfis.map(perfil => PerfilLabel.get(perfil));
    return descricaoPerfis.join(', ');
  }

  getNome(){
    return this.usuario.nome;
  }

  getCpf(){
    return this.usuario.cpf;
  }

  fotoAlterada(event: any){
    this.fotoPerfil = event.target.files[0];
  }
}
