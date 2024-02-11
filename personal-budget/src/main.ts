import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { MenuComponent } from './app/menu/menu.component';
import { HeroComponent } from './app/hero/hero.component';
import { HomepageComponent } from './app/homepage/homepage.component';
import { FooterComponent } from './app/footer/footer.component';
import { ArticleComponent } from './app/article/article.component';



bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
