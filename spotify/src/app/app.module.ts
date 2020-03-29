import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, ROUTES } from '@angular/router';

import { HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistComponent } from './components/artist/artist.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { LoadingComponent } from './components/shared/loading/loading.component';

// import routes
import { Route } from './app.routes';

// services
import { SpotifyService } from './services/spotify.service';

// pipes
import { NoimagePipe } from './pipes/noimage.pipe';
import { DomSeguroPipe } from './pipes/capitalizadodom-seguro.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ArtistComponent,
    NavbarComponent,
    NoimagePipe,
    DomSeguroPipe,
    TarjetasComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( Route , {useHash: true} ),
    HttpClientModule
  ],
  providers: [
    SpotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
