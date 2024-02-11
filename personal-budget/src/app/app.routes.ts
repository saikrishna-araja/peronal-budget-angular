import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HeroComponent } from './hero/hero.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [

  {
    path:'',
    component: HomepageComponent,
    pathMatch : 'full'
  },

  {
    path:'about',
    component: AboutComponent
   },

  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'contact',
    component:ContactComponent
  },
  {
    path:'**',
    component: NotfoundComponent
  }

];
