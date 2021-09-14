import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/usuario/usuario';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-add-album-coleccionista',
  templateUrl: './add-album-coleccionista.component.html',
  styleUrls: ['./add-album-coleccionista.component.css']
})
export class AddAlbumColeccionistaComponent implements OnInit {

  coleccionistaForm: FormGroup;
  userId: number;
  token: string;
  usuarios: Array<Usuario>;
  usuariosFiltered: Array<Usuario>;
  usuarioSelected: number;
  albumId: number;

  constructor(
    private albumService: AlbumService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    if(!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " "){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      this.albumId = parseInt(this.router.snapshot.params.albumId)
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.usuarios = [];
      this.usuariosFiltered= [];
      this.getUsuarios();
      this.coleccionistaForm = this.formBuilder.group({
        nombre: ["", [Validators.required, Validators.maxLength(128)]],
        id: ["", [Validators.required]]
      })
    }
  }

  addColeccionista() {
    this.albumService.agregarColeccionista(this.albumId, this.usuarioSelected)
    .subscribe()
    this.returnColeccionistaDetails();
  }

  showError(error: string){
    this.toastr.error(error, "Error")
  }

  getUsuarios():void {
    this.usuarioService.getAllUsers()
    .subscribe( usuarios => {
      this.usuarios = usuarios;
      this.usuariosFiltered = this.usuarios.filter( (usuario: Usuario) => usuario.id !== this.userId )
    })
  }

  returnColeccionistaDetails() {
    this.routerPath.navigate([`/perfil/${this.userId}/${this.token}`])
  }
}
