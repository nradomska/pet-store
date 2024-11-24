import { Injectable } from '@angular/core';
import { Filter } from '../models/filter.interface';
import { PetStatus } from '../models/status.enum';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filter: Filter = {
    name: '',
    status: PetStatus.AVAILABLE,
  };

  public filterValue$: BehaviorSubject<Filter> = new BehaviorSubject(this.filterValue);

  public set filterValue(filterValue: Filter) {
    this.filter = filterValue;
    this.filterValue$.next(filterValue);
  }

  public get filterValue(): Filter {
    return this.filter;
  }
}
