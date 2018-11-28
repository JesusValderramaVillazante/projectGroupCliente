import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';


/* Modulos nativos */
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modulos externo */
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

/* Services */
import { AuthService } from './services/auth.service';
import { RegistroService } from './services/registro.service';
import { StorageService } from './services/storage.service';
import { GuardService } from './services/guard.service';
import { UserService } from './services/user.service';

/* Componentes */
import { AppComponent } from './app.component';
import { OneBlockComponent } from './paginaPrincipal/oneBlock/oneBlock.component';
import { TwoBlockComponent } from './paginaPrincipal/twoBlock/twoBlock.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PaginaPrincipalComponent } from './paginaPrincipal/paginaPrincipal.component';
import { RegistroComponent } from './registro/registro.component';
import { PaginaUsuarioComponent } from './paginaUsuario/paginaUsuario.component';
import { PerfilBlockComponent } from './paginaUsuario/perfil-block/perfil-block.component';
import { EventosBlockComponent } from './paginaUsuario/eventos-block/eventos-block.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { FotoUsuarioComponent } from './perfil-usuario/foto-usuario/foto-usuario.component';
import { DatosUsuarioComponent } from './perfil-usuario/datos-usuario/datos-usuario.component';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';


const routes: Routes = [
  {path: '', component: PaginaPrincipalComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'perfil', component: PerfilUsuarioComponent, canActivate: [GuardService]},
  {path: 'crearEvento', component: CrearEventoComponent, canActivate: [GuardService]},
  {path: 'dashboard', component: PaginaUsuarioComponent, canActivate: [GuardService]},
  {path: '**', component: PaginaPrincipalComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    OneBlockComponent,
    TwoBlockComponent,
    HeaderComponent,
    FooterComponent,
    PaginaPrincipalComponent,
    RegistroComponent,
    PaginaUsuarioComponent,
    PerfilBlockComponent,
    EventosBlockComponent,
    PerfilUsuarioComponent,
    FotoUsuarioComponent,
    DatosUsuarioComponent,
    CrearEventoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [RegistroService, AuthService, StorageService, GuardService, UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
