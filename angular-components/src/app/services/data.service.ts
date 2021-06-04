import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  counter = 0;

  constructor() { }

  increment(){
    this.counter++;
  }
}
