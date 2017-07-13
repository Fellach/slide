import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TileComponent } from './tile.component';

@NgModule({
  declarations: [
    AppComponent,
    TileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
