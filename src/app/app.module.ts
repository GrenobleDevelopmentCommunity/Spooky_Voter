import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CompetitorComponent } from './competitor/competitor.component';
import { CategoryComponent } from './category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { VoterComponent } from './voter/voter.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material-module';

@NgModule({
  declarations: [
    AppComponent,
    CompetitorComponent,
    CategoryComponent,
    VoterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
