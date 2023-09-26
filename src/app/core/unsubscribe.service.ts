import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnsubscribeService extends Observable<boolean> implements OnDestroy {
  private sub$ = new Subject<boolean>();

  constructor() {
    super((subscriber) => this.sub$.subscribe(subscriber));
  }

  ngOnDestroy(): void {
    this.sub$.next(true);
    this.sub$.complete();
  }
}
