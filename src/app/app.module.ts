import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TopBarComponent } from './top-bar/top-bar.component';
import { GridLayoutComponent } from './grid-layout/grid-layout.component';
import { BlockComponent } from './block/block.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    GridLayoutComponent,
    BlockComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [BlockComponent]
})
export class AppModule { }
