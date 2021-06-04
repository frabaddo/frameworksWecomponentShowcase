import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { CardComponent } from '../card/card.component';
import { createCustomElement } from '@angular/elements';
import { MainComponent } from './main.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';

@NgModule({
    imports: [
        RouterTestingModule.withRoutes([
            {
                path: "",
                component: Page1Component,
                outlet: "inner",
            },
            {
                path: "page1",
                component: Page1Component,
                outlet: "inner",
            },
            {
                path: "page2",
                component: Page2Component,
                outlet: "inner",
            },
        ]),
        BrowserModule,
        CommonModule
    ],
    declarations: [
        MainComponent,
        Page1Component,
        Page2Component
    ],
    entryComponents: [
        MainComponent,
        Page1Component,
        Page2Component
    ],
    exports: [RouterTestingModule]
})
export class MainComponentModule {
    constructor(injector: Injector) {
        const main = createCustomElement(MainComponent, { injector });
        customElements.define('app-main', main);
    }
}