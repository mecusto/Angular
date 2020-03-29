import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { FilmComponent } from './components/film/film.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'buscar', component: SearchComponent },
  { path: 'buscar/:texto', component: SearchComponent },
  { path: 'pelicula/:id/:pag', component: FilmComponent },
  { path: 'pelicula/:id/:pag/:busqueda', component: FilmComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
