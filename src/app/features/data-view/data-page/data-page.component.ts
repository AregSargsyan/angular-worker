import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from 'src/app/api/data.service';
import { MockedElement } from 'src/app/core/generate-random-data';
import { DataTableComponent } from '../data-table/data-table.component';
import { DataSearchFilters, SearchFiltersComponent } from '../search-filters/search-filters.component';

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.scss'],
  standalone: true,
  imports: [DataTableComponent, SearchFiltersComponent],
})
export class DataPageComponent implements OnInit, OnDestroy {
  private dataService = inject(DataService);
  private destroy$ = new Subject<void>();

  public searchParams: DataSearchFilters = { timer: 1000, arraySize: 10, ids: '' }
  public ids: string[] = [];

  public mockedData!: MockedElement[];

  private getMockedDataFromWorker() {
    this.stopSearchingData();

    this.dataService.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.mockedData = data);

    this.dataService.startWorker(this.searchParams);
  }

  ngOnInit() {
    this.getMockedDataFromWorker();
  }

  public searchParamsChanged(ev: DataSearchFilters) {
    this.searchParams = ev;
    this.ids = ev.ids!.trim().split(',').filter(id => !!id)

    this.getMockedDataFromWorker();
  }

  public stopSearchingData() {
    this.destroy$.next();
    this.dataService.stopWorker();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    this.dataService.stopWorker();
  }
}
