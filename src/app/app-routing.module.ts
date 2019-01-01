import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { GuardService } from './services/guard.service';

import { PaginaPrincipalComponent } from './components/paginaPrincipal/paginaPrincipal.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { CrearEventoComponent } from './components/crear-evento/crear-evento.component';
import { PaginaUsuarioComponent } from './components/paginaUsuario/paginaUsuario.component';
import { EventoComponent } from './components/evento/evento.component';

const routes: Routes = [
  {path: '', component: PaginaPrincipalComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'perfil', component: PerfilUsuarioComponent, canActivate: [GuardService]},
  {path: 'crearEvento', component: CrearEventoComponent, canActivate: [GuardService]},
  {path: 'eventos', component: PaginaUsuarioComponent, canActivate: [GuardService]},
  {path: 'event/:id', component: EventoComponent, canActivate: [GuardService]},
  {path: '**', component: PaginaPrincipalComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash : true }),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
