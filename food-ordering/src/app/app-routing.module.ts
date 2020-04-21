import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {MenuComponent} from "./menu/menu.component";
import {MenuResolverService} from "./menu/menu-resolver.service";


const routes: Routes = [
  {
    path: 'menu',
    component: MenuComponent,
    resolve: {
      content: MenuResolverService
    }
  },
  { path: '', component: HomepageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
