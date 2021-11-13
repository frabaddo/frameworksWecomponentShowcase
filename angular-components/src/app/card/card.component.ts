import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, timer } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { decrement, increment } from '../app.module';
import { DataService } from '../services/data.service';

@Component({
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation:ViewEncapsulation.ShadowDom
})
export class CardComponent implements OnInit, OnDestroy {

  _disabled : boolean = false;
  @HostBinding('class.activable') activable: boolean = true;
  @Input("disabled") set disabled(disabled :string){
    this._disabled = (disabled=="true");
    this.activable = !this._disabled;
  }

  $clicker : Subject<any> = new Subject();
  $destroy : Subject<any> = new Subject();
  $click : Observable<any> = (this.$clicker).pipe(
    filter((val)=>!this._disabled),
    tap(()=>this.active=true),
    switchMap(()=>timer(200).pipe(
      tap(()=>this.active=false)
    )),
    takeUntil(this.$destroy)
  );
  @HostListener('click') Activate(){
    this.$clicker.next();
  }
  @HostBinding('class.active') active: boolean = false;

  @Input("name") name = "";

  @Output("carded") carded : EventEmitter<number> = new EventEmitter<number>()

  selected = this.store.select((state => (state as any).base.count))

  sharedCount = 0

  constructor(
    public data: DataService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.$click.subscribe();
    document.body.addEventListener('sharedEvent', e => this.sharedCount = this.sharedCount + 1);
  }
  
  sendShared() {
      const event = new CustomEvent('sharedEvent', {
          bubbles: true,
          detail: { text: 'hello' }
      });
      document.body.dispatchEvent(event);
  }
  
  ngOnDestroy(){
    this.$destroy.next();
  }

  inc(){
    this.data.increment();
    this.carded.emit(this.data.counter)
  }

  handleDecrementClick(){
    this.store.dispatch(decrement())
  }
  handleIncrementClick(){
    this.store.dispatch(increment())
  }

}
