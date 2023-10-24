import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime, first } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent implements OnInit,OnDestroy {
  private debounceSuscription?:Subscription;
  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Input()
  public InitialValue: string = '';

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debounceSuscription = this.debouncer.pipe(
      debounceTime(300)
    ).subscribe((value) => {
      this.onDebounce.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.debounceSuscription?.unsubscribe();
  }

  emitValue(value: string): void {
    this.onValue.emit(value);
  }

  onKeyPress(searchItem: string) {
    this.debouncer.next(searchItem);
  }
}
