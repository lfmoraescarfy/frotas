import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PaginationService } from "src/app/core/services/pagination.service";
import Swal from "sweetalert2";
import { UsuarioService } from "../../services/usuario.service";
import { Usuario } from "src/app/core/models/usuario.model";
import { PerfilLabel } from "src/app/shared/enums/perfil.enum";

@Component({
    selector: 'app-usuario-grid',
    templateUrl: 'usuario-grid.component.html'
  })
export class UsuarioGridComponent implements OnChanges {
    @Input() allUsuarios: any[] = [];
    @Input() usuarios: any[] = [];
    usuarioEdit: any;

    constructor(
      public paginationService: PaginationService,
      private modalService: NgbModal,
      private service: UsuarioService) {}

    ngOnChanges(changes: SimpleChanges): void {
      if(changes.usuarios.currentValue.length > 0){
        this.paginationService.init(changes.usuarios.currentValue);
      }
    }
    
    changePage() {
      this.usuarios = this.paginationService.changePage(this.allUsuarios)
    }
    
    onSort(column: any) {
      this.usuarios = this.paginationService.onSort(column, this.usuarios)
    }
    
    openModal(content: any, index: any) {
      this.usuarioEdit = this.usuarios[index];
      const modalRef = this.modalService.open(content, { size: 'lg', centered: true })
      modalRef.result.then((data: any) => {
          const index = this.allUsuarios.indexOf(this.usuarioEdit);
          this.allUsuarios[index] = data;
          this.changePage();
        }
      );
    }

    delete(usuario: any){
      Swal.fire({
        title: 'Atenção!',
        text: 'Confirma a remoção do usuário?',
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.delete(usuario.id).pipe().subscribe({
            next: response => {
              Swal.fire({
                title: 'Usuário removido com sucesso!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true
              }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
                  const index = this.allUsuarios.indexOf(usuario);
                  this.allUsuarios.splice(index, 1);
                  this.allUsuarios = [...this.allUsuarios]
                  this.changePage();
                }
              });
            },
            error: error => {
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

    addUsuario(usuario: Usuario){
      this.allUsuarios.push(usuario);
      this.changePage();
    }

    getPerfil(perfil: number) {
      return PerfilLabel.get(perfil)
    }
}