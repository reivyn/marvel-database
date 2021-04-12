import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {CharactersComponent} from './pages/characters/characters.component';

const routes: Routes = [
  {path: '', component: CharactersComponent },
  {path: 'home', redirectTo: 'characters'},
  {path: 'characters', component: CharactersComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
