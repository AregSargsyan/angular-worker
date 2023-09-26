import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SearchFiltersComponent, DataSearchFilters } from './search-filters.component';
import { UnsubscribeService } from 'src/app/core/unsubscribe.service';

describe('SearchFiltersComponent', () => {
  let component: SearchFiltersComponent;
  let mockUnsubscribeService: UnsubscribeService;

  beforeEach(waitForAsync(() => {
    mockUnsubscribeService = { unsubscribe: jest.fn() } as any;

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SearchFiltersComponent],
      providers: [
        { provide: UnsubscribeService, useValue: mockUnsubscribeService },
        FormBuilder
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(SearchFiltersComponent);
    component = fixture.componentInstance;
    component.searchParams = { timer: null, arraySize: null };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.searchForm.value).toEqual({
      timer: 0,
      arraySize: 0
    });
  });

  it('should emit searchData when form is valid', () => {
    const mockData: DataSearchFilters = { timer: 10, arraySize: 20 };
    const emitSpy = jest.spyOn(component.searchData, 'emit');

    component.searchForm.patchValue(mockData);
    component.searchForm.updateValueAndValidity();

    expect(emitSpy).toHaveBeenCalledWith(mockData);
  });

  it('should emit stopSearchingData when form is invalid', () => {
    const emitSpy = jest.spyOn(component.stopSearchingData, 'emit');

    component.searchForm.patchValue({ timer: 0, arraySize: 5 });
    component.searchForm.updateValueAndValidity();

    expect(emitSpy).toHaveBeenCalled();
  });
});
