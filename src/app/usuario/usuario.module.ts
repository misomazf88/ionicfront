import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioSignupComponent } from './usuario-signup/usuario-signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfilUsrComponent } from './perfil-usr/perfil-usr.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [UsuarioLoginComponent, UsuarioSignupComponent, PerfilUsrComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  exports: [UsuarioLoginComponent, UsuarioSignupComponent]
})
export class UsuarioModule { }
