import { VoorstellingService } from './services/voorstelling.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { VoorstellingComponent } from './components/dashboard/voorstelling.component';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { DropdownDirective } from './components/shared/dropdown.directive';

import { FilmService } from './services/film.service';
import { FilmsComponent } from './components/films/films.component';
import { FilmStartComponent } from './components/films/film-start/film-start.component'
import { FilmListComponent } from './components/films/film-list/film-list.component'
import { FilmItemComponent } from './components/films/film-list/film-item/film-item.component'
import { FilmDetailComponent } from './components/films/film-detail/film-detail.component'
import { FilmEditComponent } from './components/films/film-edit/film-edit.component'

import { BioscoopService } from './services/bioscoop.service';
import { BioscopenComponent } from './components/halls/bioscoop.component';
import { BioscoopEditComponent } from './components/halls/bioscoop-edit/bioscoop-edit.component' 
import { VoorstellingEditComponent} from './components/dashboard/voorstelling-edit/voorstelling-edit.component'

@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,    
    VoorstellingComponent,
    HeaderComponent,
    FilmsComponent,
    FilmStartComponent,
    FilmListComponent,
    FilmItemComponent,
    FilmDetailComponent,
    FilmEditComponent,
    BioscopenComponent,
    BioscoopEditComponent,
    VoorstellingEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    VoorstellingService,
    FilmService,
    BioscoopService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
