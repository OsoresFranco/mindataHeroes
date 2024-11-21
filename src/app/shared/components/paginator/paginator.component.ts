import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CoreModule } from '../../../core/core.module';

@Component({
  selector: 'app-paginator',
  imports: [CoreModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input() page: number = 1;
  @Input() perPage!: number;
  @Input() totalItems!: number;
  @Input() viewMode: 'grid' | 'list' = 'grid';
  @Output() pageChange = new EventEmitter<number>();
  @Output() perPageChange = new EventEmitter<number>();
  @Output() viewModeChange = new EventEmitter<'grid' | 'list'>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.perPage);
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
      this.pageChange.emit(this.page);
    }
  }

  changePerPage(event: any): void {
    this.perPage = event?.target?.value || '';
    this.perPageChange.emit(this.perPage);
    this.page = 1;
    this.pageChange.emit(this.page);
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
    this.viewModeChange.emit(this.viewMode);
  }
}
