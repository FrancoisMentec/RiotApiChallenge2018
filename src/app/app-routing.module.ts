import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GridLayoutComponent } from './grid-layout/grid-layout.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'summoner/:region/:summoner', component: GridLayoutComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
