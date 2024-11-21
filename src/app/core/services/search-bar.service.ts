import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  private readonly searchValueSubject = new BehaviorSubject<string>('');
  searchValue$ = this.searchValueSubject.asObservable();

  constructor() {}

  setSearchValue(value: string): void {
    console.log('asd')
    this.searchValueSubject.next(value);
  }
}
