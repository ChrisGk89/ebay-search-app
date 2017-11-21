import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SearchService } from './search/search.service';
import { Http } from '@angular/http';
import {DataListModule, SharedModule, PanelModule} from 'primeng/primeng';
import { LoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    DataListModule,
    PanelModule,
    SharedModule,
    BrowserAnimationsModule,
    LoadingModule
  ],
  exports: [NgbModule],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
