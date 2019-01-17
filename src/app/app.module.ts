import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TopBarComponent } from './top-bar/top-bar.component';
import { GridLayoutComponent } from './grid-layout/grid-layout.component';
import { BlockComponent } from './block/block.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ChampionComponent } from './champion/champion.component';
import { LeagueComponent } from './league/league.component';
import { PopupComponent } from './popup/popup.component';
import { TextfieldComponent } from './textfield/textfield.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    GridLayoutComponent,
    BlockComponent,
    WelcomeComponent,
    ChampionComponent,
    LeagueComponent,
    PopupComponent,
    TextfieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  entryComponents: [BlockComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
