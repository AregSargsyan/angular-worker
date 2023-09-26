import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { filter, takeUntil } from 'rxjs';
import { UnsubscribeService } from 'src/app/core/unsubscribe.service';
import { SharedModule } from 'src/app/shared/shared.module';

export interface DataSearchFilters {
  timer: number | null;
  arraySize: number | null;
  ids: string | null;
};

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
  imports: [
    SharedModule
  ],
  standalone: true,
  providers: [UnsubscribeService]
})
export class SearchFiltersComponent implements OnInit {
  @Output() searchData = new EventEmitter<DataSearchFilters>();
  @Output() stopSearchingData = new EventEmitter<void>();
  @Input() searchParams!: DataSearchFilters;

  private fb = inject(FormBuilder);
  private unsubscribe = inject(UnsubscribeService);

  public searchForm = this.fb.group({
    timer: [0, [Validators.required, Validators.min(5)]],
    arraySize: [0, [Validators.required, Validators.min(10)]],
    ids: ['']
  });

  get timerControl() {
    return this.searchForm.controls.timer;
  }

  get arraySizeControl() {
    return this.searchForm.controls.arraySize;
  }

  ngOnInit() {
    this.setUpForm();
    this.subscribeToFormChanges();
    this.subscribeToFormStatusChanges();
  }

  private setUpForm() {
    this.searchForm.patchValue(this.searchParams);
  }

  private subscribeToFormChanges() {
    this.searchForm.valueChanges
      .pipe(
        filter(() => this.searchForm.valid),
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => this.searchData.emit(this.searchForm.getRawValue()))
  }

  private subscribeToFormStatusChanges() {
    this.searchForm.statusChanges
      .pipe(
        filter((res) => res === 'INVALID'),
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => this.stopSearchingData.emit())
  }
}
