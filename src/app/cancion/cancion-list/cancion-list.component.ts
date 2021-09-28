import { Component, OnInit } from '@angular/core';
import { Cancion } from '../cancion';
import { CancionService } from '../cancion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cancion-list',
  templateUrl: './cancion-list.component.html',
  styleUrls: ['./cancion-list.component.css']
})
export class CancionListComponent implements OnInit {

  constructor(
    private songService: CancionService,
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  userId: number
  token: string
  songs: Array<Cancion>
  showSongs: Array<Cancion>
  selectedSong: Cancion
  indexSelected: number = 0

  ngOnInit() {
    if(!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " "){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.getSongs();
    }
  }

  getSongs():void{
    this.songService.getSongs()
    .subscribe(songs => {
      this.songs = songs
      this.showSongs = songs
      this.onSelect(this.showSongs[0], 0)
    })
  }

  onSelect(cancion: Cancion, indice: number){
    this.indexSelected = indice
    cancion.favorite = this.validateFavoriteSong(cancion)
    this.selectedSong = cancion
    this.songService.getAlbumesCancion(cancion.id)
    .subscribe(albumes => {
      this.selectedSong.albumes = albumes
    },
    error => {
      this.showError(`Ha ocurrido un error: ${error.message}`)
    })

  }

  validateFavoriteSong(cancion: Cancion) {
    let result = false
    for (let i in cancion.usuariosFavoritos) {
      if (cancion.usuariosFavoritos[i] == this.userId) {
        result = true
      }
    }
    return result
  }

  searchSong(search: string){
    let songsSearch: Array<Cancion> = []
    this.songs.map( song => {
      if(song.titulo.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
        songsSearch.push(song)
      }
    })
    this.showSongs = songsSearch
  }

  eliminarCancion(){
    this.songService.eliminarCancion(this.selectedSong.id)
    .subscribe(cancion => {
      this.ngOnInit()
      this.showSuccess()
    },
    error=> {
      this.showError("Ha ocurrido un error. " + error.message)
    })
  }

  addFavoriteSong(){
    this.songService.addFavoriteSong(this.selectedSong, this.userId)
    .subscribe(resp => {
      this.ngOnInit()
      this.showSuccessFavorite()
    },
    error=> {
      this.showError("Ha ocurrido un error. " + error.message)
    })
  }

  deleteFavoriteSong(){
    this.songService.deleteFavoriteSong(this.selectedSong.id, this.userId)
    .subscribe(resp => {
      this.ngOnInit()
      this.showSuccessDeleteFavorite()
    },
    error=> {
      this.showError("Ha ocurrido un error. " + error.message)
    })
  }

  irCrearCancion(){
    this.routerPath.navigate([`/canciones/create/${this.userId}/${this.token}`])
  }

  showError(error: string){
    this.toastr.error(error, "Error de autenticación")
  }

  showSuccess() {
    this.toastr.success(`La canción fue eliminada`, "Eliminada exitosamente");
  }

  showSuccessFavorite() {
    this.toastr.success(`La canción fue agregada a favoritos`, "Agregada exitosamente");
  }

  showSuccessDeleteFavorite() {
    this.toastr.success(`La canción fue eliminada de favoritos`, "Eliminada exitosamente");
  }

}
