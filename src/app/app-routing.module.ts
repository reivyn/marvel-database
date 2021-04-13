import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {CharactersComponent} from './pages/characters/characters.component';
import {ComicsComponent} from './pages/comics/comics.component';
import {CharacterDetailsComponent} from './pages/character-details/character-details.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent },
  {path: 'characters', component: CharactersComponent},
  {path: 'characters/:id', component: CharacterDetailsComponent},
  {path: 'characters/:id/comics', component: ComicsComponent},
  {path: 'comics', component: ComicsComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
