import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AlbumCreateComponent } from './album-create/album-create.component';
import { AlbumEditComponent } from './album-edit/album-edit.component';
import { AppHeaderModule } from '../app-header/app-header.module';
import { AlbumJoinCancionComponent } from './album-join-cancion/album-join-cancion.component';
import { AddAlbumColeccionistaComponent } from './add-album-coleccionista/add-album-coleccionista.component';
import { FilterAlbumComponent } from './filter-album/filter-album.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [AlbumListComponent, AlbumDetailComponent, AlbumCreateComponent, AlbumEditComponent, AlbumJoinCancionComponent, AddAlbumColeccionistaComponent, FilterAlbumComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppHeaderModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatExpansionModule
  ],
  exports:[
    AlbumListComponent,
    AlbumDetailComponent,
    AlbumCreateComponent,
    AlbumEditComponent,
    AlbumJoinCancionComponent,
    FilterAlbumComponent
  ]
})
export class AlbumModule { }
