import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Album } from 'src/app/album/album';
import { AlbumService } from 'src/app/album/album.service';
import { Cancion } from 'src/app/cancion/cancion';
import { CancionService } from 'src/app/cancion/cancion.service';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-perfil-usr',
  templateUrl: './perfil-usr.component.html',
  styleUrls: ['./perfil-usr.component.css']
})
export class PerfilUsrComponent implements OnInit {

  userId: number;
  token: string;
  usuarios: Array<Usuario>;
  canciones: Array<Cancion>;
  albumes: Array<Album>;
  cancionesUsuario: Array<Cancion>;
  columnas: string[] = ['titulo', 'interprete', 'duracion','usuariosCompartidos', 'acciones'];
  albumesUsuario: Array<Album>;


  constructor(
    private usuarioService: UsuarioService,
    private cancionService: CancionService,
    private albumService: AlbumService,
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService) {

  }

  ngOnInit() {
    if(!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " "){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.");
    }
    else{
      this.userId = parseInt(this.router.snapshot.params.userId);
      this.token = this.router.snapshot.params.userToken;
      this.canciones = [];
      this.albumes = [];
      this.cancionesUsuario = [];
      this.usuarios = [];
      this.albumesUsuario = [];
      this.getCanciones();
      this.getAlbumes();
      this.getUsuarios();
    }
  }

  showError(error: string){
    this.toastr.error(error, "Error de autenticación")
  }

  getCanciones():void{
    this.cancionService.getCanciones()
    .subscribe(canciones => {
      this.canciones= canciones;
      this.cancionesUsuario = this.canciones.filter( (cancion : Cancion) => cancion.coleccionista === this.userId)
    })
  }

  getAlbumes():void{
    this.albumService.getAlbumes(this.userId, this.token)
    .subscribe(albumes => {
      this.albumes= albumes;
      this.albumesUsuario = this.albumes
    })
  }

  agregarColeccionista(idCancion: number){
    this.routerPath.navigate([`/canciones/agregar-coll/${idCancion}/${this.userId}/${this.token}`])
  }

  agregarColeccionistaAlbum(idAlbum: number){
    this.routerPath.navigate([`/albumes/agregar-coll/${idAlbum}/${this.userId}/${this.token}`])
  }

  getUsuarios(): void {
    this.usuarioService.getAllUsers()
    .subscribe ( usuarios => {
      this.usuarios = usuarios;
    })
  }
}
