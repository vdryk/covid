import { Component, Directive, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'jhi-parent',
  template: '',
})
export class ParentComponent implements OnDestroy {
  destroy$: Subject<boolean> = new Subject();
  constructor() {}
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
