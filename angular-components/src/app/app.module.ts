import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { DoBootstrap } from '@angular/core';

import { CardComponent } from './card/card.component';
import { createCustomElement } from '@angular/elements';
import { DataService } from './services/data.service';
import { MainComponentModule } from './main/main.comoponent.module';
import { createAction, createReducer, on, StoreModule } from '@ngrx/store';


export const increment = createAction('INCREMENT');
export const decrement = createAction('DECREMENT');

export const store = createReducer(
  {count: 0},
  on(increment, state => ({ ...state, count: state.count + 1 })),
  on(decrement, state => ({ ...state, count: state.count - 1 })),
);

@NgModule({
  imports: [
    BrowserModule,
    MainComponentModule,
    StoreModule.forRoot({base: store}, {})
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
