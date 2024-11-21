import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchBarService } from '../../../core/services/search-bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  standalone: true,
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchControl: FormControl = new FormControl('');
  searchTermSub$: Subscription = new Subscription();

  constructor(private searchBarService: SearchBarService) {}

  ngOnInit(): void {
    this.searchTermSub$ = this.searchControl.valueChanges
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe((value) => {
        this.setSearchTerm(value);
      });
  }

  setSearchTerm(searchTerm: string): void {
    this.searchBarService.setSearchValue(searchTerm);
  }

  ngOnDestroy(): void {
    this.searchTermSub$.unsubscribe();
  }
}
