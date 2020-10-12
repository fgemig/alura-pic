import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-photo-search',
  templateUrl: './photo-search.component.html',
  styleUrls: ['./photo-search.component.css']
})
export class PhotoSearchComponent implements OnInit, OnDestroy {

  @Output() typing = new EventEmitter<string>();
  @Input() value = '';

  debounce: Subject<string> = new Subject<string>();

  constructor() { }

  ngOnInit(): void {

    this.debounce
    .pipe(debounceTime(500))
    .subscribe(filter => this.typing.emit(filter));
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }
}
