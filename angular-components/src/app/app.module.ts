import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { DoBootstrap } from '@angular/core';

import { CardComponent } from './card/card.component';
import { createCustomElement } from '@angular/elements';
import { DataService } from './services/data.service';
import { MainComponentModule } from './main/main.comoponent.module';

@NgModule({
  imports: [
    BrowserModule,
    MainComponentModule
  ],
  declarations:[
    CardComponent
  ],
  entryComponents:[
    CardComponent
  ],
  providers: [
    DataService
  ]
})
export class AppModule implements DoBootstrap {
  constructor(injector: Injector) {
    const card = createCustomElement(CardComponent,{injector});
    customElements.define('ngx-app-card', card);
  }
  ngDoBootstrap() {}
}
