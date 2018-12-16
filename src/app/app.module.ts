import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { environment } from '../environments/environment';

/* Modulos nativos */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modulos externo */
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from './admin/admin.module';

/* Services */
import { AuthService } from './services/auth.service';
import { RegistroService } from './services/registro.service';
import { StorageService } from './services/storage.service';
import { GuardService } from './services/guard.service';
import { UserService } from './services/user.service';
import { AdminService } from './services/admin.service';

/* Componentes */
import { AppComponent } from './app.component';
import { OneBlockComponent } from './components/paginaPrincipal/oneBlock/oneBlock.component';
import { TwoBlockComponent } from './components/paginaPrincipal/twoBlock/twoBlock.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaginaPrincipalComponent } from './components/paginaPrincipal/paginaPrincipal.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PaginaUsuarioComponent } from './components/paginaUsuario/paginaUsuario.component';
import { PerfilBlockComponent } from './components/paginaUsuario/perfil-block/perfil-block.component';
import { EventosBlockComponent } from './components/paginaUsuario/eventos-block/eventos-block.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { FotoUsuarioComponent } from './components/perfil-usuario/foto-usuario/foto-usuario.component';
import { DatosUsuarioComponent } from './components/perfil-usuario/datos-usuario/datos-usuario.component';
import { CrearEventoComponent } from './components/crear-evento/crear-evento.component';
import { EventoComponent } from './components/evento/evento.component';

/* Pipes */
import { FillPipe } from './pipes/fill.pipe';
import { ReversePipe } from './pipes/reverse.pipe';

/* Rutas */
import { AppRoutingModule } from './app-routing.module';

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
    CrearEventoComponent,
    EventoComponent,
    FillPipe,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AdminModule,
    AppRoutingModule,
  ],
  providers: [RegistroService, AuthService, StorageService, GuardService, UserService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
