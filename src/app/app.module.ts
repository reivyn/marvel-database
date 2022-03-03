import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './pages/navbar/navbar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HomeComponent} from './pages/home/home.component';
import {FooterComponent} from './pages/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {CharactersComponent} from './pages/characters/characters.component';
import {MaterialSharedModule} from './shared/material-module';
import {FormsModule} from '@angular/forms';
import {SearchComponent} from './pages/search/search.component';
import {ComicsComponent} from './pages/comics/comics.component';
import {MarvelCardsComponent} from './pages/marvel-cards/marvel-cards.component';
import {CharacterDetailsComponent} from './pages/character-details/character-details.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CharactersComponent,
    FooterComponent,
    SearchComponent,
    ComicsComponent,
    MarvelCardsComponent,
    CharacterDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialSharedModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
