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

/* Componentes */
import { AppComponent } from './app.component';
import { OneBlockComponent } from './paginaPrincipal/oneBlock/oneBlock.component';
import { TwoBlockComponent } from './paginaPrincipal/twoBlock/twoBlock.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PaginaPrincipalComponent } from './paginaPrincipal/paginaPrincipal.component';
import { RegistroComponent } from './registro/registro.component';
import { UserComponent } from './dashboard/user/user.component';

const routes: Routes = [
  {path: '', component: PaginaPrincipalComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'dashboard', component: UserComponent, canActivate: [GuardService]},
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
    UserComponent
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
  providers: [RegistroService, AuthService, StorageService, GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
