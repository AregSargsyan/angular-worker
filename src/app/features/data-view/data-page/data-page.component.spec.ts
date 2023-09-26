import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DataPageComponent } from './data-page.component';
import { DataService } from 'src/app/api/data.service';

const dataServiceMock = {
  data$: of([{ }]),
  startWorker: jest.fn(),
  stopWorker: jest.fn(),
};

describe('DataPageComponent', () => {
  let component: DataPageComponent;
  let fixture: ComponentFixture<DataPageComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataPageComponent],
      providers: [
        { provide: DataService, useValue: dataServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataPageComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call startWorker from dataService when initialized', () => {
    expect(dataService.startWorker).toHaveBeenCalled();
  });

  it('should stop dataService worker when destroyed', () => {
    component.ngOnDestroy();
    expect(dataService.stopWorker).toHaveBeenCalled();
  });
});
