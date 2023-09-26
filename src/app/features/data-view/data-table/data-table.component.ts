import { Component, Input, OnChanges } from '@angular/core';
import { MockedElement } from 'src/app/core/generate-random-data';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class DataTableComponent implements OnChanges {
@Input() mockedData: MockedElement[] = [];

@Input() ids: string[] = [];

public itemsToRender: MockedElement[] = []

ngOnChanges() {
  if (this.mockedData) {
    const last10Items = this.mockedData.slice(-10);
    const itemsByIDs = this.pickByIDs(this.mockedData, this.ids);
    this.itemsToRender = this.uniqueFrom(last10Items.concat(itemsByIDs))
  }
}

uniqueFrom(arr: MockedElement[]): MockedElement[] {
  return Array.from(new Set(arr));
}

pickByIDs(arr: MockedElement[], ids: string[]): MockedElement[] {
  return ids.map(id => arr.find(item => item.id == id)!).filter(item => !!item);
}
}
