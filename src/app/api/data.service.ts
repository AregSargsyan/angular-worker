import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MockedElement } from '../core/generate-random-data';
import { DataSearchFilters } from '../features/data-view/search-filters/search-filters.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private worker: Worker;
  public data$ = new Subject<MockedElement[]>();

  constructor() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('../core/app.worker', import.meta.url));
      this.worker.onmessage = ({ data }) => {
        this.data$.next(data);
      };
    } else {
      alert('Web Workers are not supported in this environment.')
      throw new Error("Web Workers are not supported in this environment.");
    }
  }

  startWorker(searchParams: DataSearchFilters) {
    console.log(searchParams);
    this.worker.postMessage({ action: 'START', payload: searchParams });
  }

  stopWorker() {
    console.log("stop")
    this.worker.postMessage({ action: 'STOP' });
  }

}
