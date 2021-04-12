import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {CharactersComponent} from './pages/characters/characters.component';
import {ComicsComponent} from './pages/comics/comics.component';


const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'home', redirectTo: ''},
  {path: 'characters', component: CharactersComponent},
  {path: 'comics', component: ComicsComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
