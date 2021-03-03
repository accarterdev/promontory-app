import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieResultCardComponent } from './movie-result-card/movie-result-card.component';
import { MovieDetailModalComponent } from './movie-detail-modal/movie-detail-modal.component';
import { OmdbService } from './shared/omdb-service/omdb.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { ResultsViewComponent } from './results-view/results-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieResultCardComponent,
    MovieDetailModalComponent,
    SideNavigationComponent,
    HeaderBarComponent,
    ResultsViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  providers: [OmdbService],
  bootstrap: [AppComponent],
})
export class AppModule {}
