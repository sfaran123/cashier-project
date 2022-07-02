import {Component, Input, Output, OnDestroy, OnInit, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {PaginationData} from './classes/pagination-data';
import {DataTableCriteria} from './classes/data-table-criteria';
import {DataTableResponse} from './classes/data-table-response';
import {DataTableColumn} from './classes/data-table-column';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  animations: [
    trigger('rotate', [
      state('inactive', style({
        transform: 'rotate(0)',
      })),
      state('active', style({
        transform: 'rotate(180deg)',
      })),
      transition('active => inactive', animate('200ms')),
      transition('inactive => active', animate('200ms'))
    ]),
    trigger('fade', [
      state('inactive', style({
        display: 'none',
        opacity: '0',
      })),
      state('active', style({
        display: '*',
        opacity: '1',
      })),
      transition('active => inactive', animate('200ms')),
      transition('inactive => active', animate('200ms'))
    ])
  ]
})
export class DataTableComponent implements OnInit, OnDestroy {

  @Input() tableName: string;
  @Input() columns: DataTableColumn[] = [];
  @Input() formUrl: string;
  @Input() hasCheckColumn: boolean;
  @Input() disableCheckAll = false;
  @Input() hasActionsHeader = true;
  @Input() showSearch = true;
  @Input() limit = 30;
  @Input() isSelectable = false;
  @Input() paginationClass: string;

  @Output() fetchItems = new EventEmitter<boolean>();

  items: object[] = [];
  sub = new Subscription();
  criteria = new DataTableCriteria();
  paginationData = new PaginationData(this.limit);
  isSearchActive: boolean;
  isLoading: boolean;
  savedItem: string;

  constructor(protected router: Router, protected route: ActivatedRoute) {
  }

  ngOnInit() {
    this.checkSavedItem('saved-item');

    this.sub.add(this.route.queryParams.subscribe(() => this.init()));
  }

  private init(): void {
    const page = +this.route.snapshot.queryParams.page;
    this.criteria.page = page && page > 1 ? page : 1;

    this.paginationData.currentPage = this.criteria.page;
    this.loadItems();
  }

  loadItems(): void {
    this.isLoading = true;
    this.fetchItems.emit(true);
  }

  setItems(response: DataTableResponse): void {
    this.isLoading = false;
    this.paginationData.totalItems = response && response.total ? response.total : 0;
    this.paginationData.totalPages = response && response.lastPage ? response.lastPage : 0;

    if (this.criteria.page > response.lastPage) {
      this.criteria.page = this.paginationData.totalPages;
      this.paginationData.currentPage = this.criteria.page;
    }

    this.items = response && response.items ? response.items : [];

    this.items.map((item: { id: number, checked: boolean }) => {
      item.checked = this.criteria.isCheckAll;
      this.criteria.checkedItems.forEach(checkedItem => {
        if (checkedItem.id === item.id) {
          item.checked = !this.criteria.isCheckAll;
        }
      });
    });
  }

  checkSavedItem(key: string): void {
    if (sessionStorage.getItem(key)) {
      this.savedItem = sessionStorage.getItem(key);
      sessionStorage.removeItem(key);
    }
  }

  search(event?: KeyboardEvent): void {
    if (((event && (event.code === 'Enter' || event.code === 'NumpadEnter')) || !event) && !this.isLoading) {
      this.isSearchActive = !!this.criteria.keyword || Object.keys(this.criteria.filters).length > 0;
      this.loadItems();
    }
  }

  extendedSearch(values: object): void {
    this.criteria.filters = values;

    if (this.criteria.page > 1) {
      this.criteria.page = 1;
      this.paginationData.currentPage = this.criteria.page;

      const url: string = this.router.url.substring(0, this.router.url.indexOf('?'));
      this.router.navigateByUrl(url);
    } else {
      this.search();
    }
  }

  clearFilters(): void {
    this.criteria.filters = {};
    this.search();
  }

  sort(column: DataTableColumn): void {
    this.criteria.sort.column = column.name;
    this.criteria.sort.direction = (this.criteria.sort.direction === 'DESC') ? 'ASC' : 'DESC';
    this.loadItems();
  }

  checkAll(isChecked: boolean): void {
    this.criteria.isCheckAll = isChecked;

    this.criteria.checkedItems = [];

    this.items.forEach(item => {
      item['checked'] = isChecked;
    });
  }

  checkItem(item: any, isChecked: boolean): void {
    item.checked = isChecked;
    if (this.criteria.isCheckAll) {
      if (isChecked) {
        this.removeFromCheckedItemsList(item);
      } else {
        this.addToCheckedItemsList(item);
      }
    } else {
      if (isChecked) {
        this.addToCheckedItemsList(item);
      } else {
        this.removeFromCheckedItemsList(item);
      }
    }
  }

  private addToCheckedItemsList(item: any): void {
    this.criteria.checkedItems.push(item);
  }

  private removeFromCheckedItemsList(item: any): void {
    this.criteria.checkedItems.some((checkedItem, index) => {
      if (checkedItem.id === item.id) {
        this.criteria.checkedItems.splice(+index, 1);
        return true;
      }
    });
  }

  rotateSortingIcon(): string {
    return (this.criteria.sort.direction === 'DESC') ? 'inactive' : 'active';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
