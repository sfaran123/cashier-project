"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var animations_1 = require("@angular/animations");
var pagination_data_1 = require("./classes/pagination-data");
var data_table_criteria_1 = require("./classes/data-table-criteria");
var DataTableComponent = /** @class */ (function () {
    function DataTableComponent(router, route) {
        this.router = router;
        this.route = route;
        this.columns = [];
        this.disableCheckAll = false;
        this.hasActionsHeader = true;
        this.showSearch = true;
        this.limit = 30;
        this.isSelectable = false;
        this.fetchItems = new core_1.EventEmitter();
        this.items = [];
        this.sub = new rxjs_1.Subscription();
        this.criteria = new data_table_criteria_1.DataTableCriteria();
        this.paginationData = new pagination_data_1.PaginationData(this.limit);
    }
    DataTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.checkSavedItem('saved-item');
        this.sub.add(this.route.queryParams.subscribe(function () { return _this.init(); }));
    };
    DataTableComponent.prototype.init = function () {
        var page = +this.route.snapshot.queryParams.page;
        this.criteria.page = page && page > 1 ? page : 1;
        this.paginationData.currentPage = this.criteria.page;
        this.loadItems();
    };
    DataTableComponent.prototype.loadItems = function () {
        this.isLoading = true;
        this.fetchItems.emit(true);
    };
    DataTableComponent.prototype.setItems = function (response) {
        var _this = this;
        this.isLoading = false;
        this.paginationData.totalItems = response && response.total ? response.total : 0;
        this.paginationData.totalPages = response && response.lastPage ? response.lastPage : 0;
        if (this.criteria.page > response.lastPage) {
            this.criteria.page = this.paginationData.totalPages;
            this.paginationData.currentPage = this.criteria.page;
        }
        this.items = response && response.items ? response.items : [];
        this.items.map(function (item) {
            item.checked = _this.criteria.isCheckAll;
            _this.criteria.checkedItems.forEach(function (checkedItem) {
                if (checkedItem.id === item.id) {
                    item.checked = !_this.criteria.isCheckAll;
                }
            });
        });
    };
    DataTableComponent.prototype.checkSavedItem = function (key) {
        if (sessionStorage.getItem(key)) {
            this.savedItem = sessionStorage.getItem(key);
            sessionStorage.removeItem(key);
        }
    };
    DataTableComponent.prototype.search = function (event) {
        if (((event && (event.code === 'Enter' || event.code === 'NumpadEnter')) || !event) && !this.isLoading) {
            this.isSearchActive = !!this.criteria.keyword || Object.keys(this.criteria.filters).length > 0;
            this.loadItems();
        }
    };
    DataTableComponent.prototype.extendedSearch = function (values) {
        this.criteria.filters = values;
        if (this.criteria.page > 1) {
            this.criteria.page = 1;
            this.paginationData.currentPage = this.criteria.page;
            var url = this.router.url.substring(0, this.router.url.indexOf('?'));
            this.router.navigateByUrl(url);
        }
        else {
            this.search();
        }
    };
    DataTableComponent.prototype.clearFilters = function () {
        this.criteria.filters = {};
        this.search();
    };
    DataTableComponent.prototype.sort = function (column) {
        this.criteria.sort.column = column.name;
        this.criteria.sort.direction = (this.criteria.sort.direction === 'DESC') ? 'ASC' : 'DESC';
        this.loadItems();
    };
    DataTableComponent.prototype.checkAll = function (isChecked) {
        this.criteria.isCheckAll = isChecked;
        this.criteria.checkedItems = [];
        this.items.forEach(function (item) {
            item['checked'] = isChecked;
        });
    };
    DataTableComponent.prototype.checkItem = function (item, isChecked) {
        item.checked = isChecked;
        if (this.criteria.isCheckAll) {
            if (isChecked) {
                this.removeFromCheckedItemsList(item);
            }
            else {
                this.addToCheckedItemsList(item);
            }
        }
        else {
            if (isChecked) {
                this.addToCheckedItemsList(item);
            }
            else {
                this.removeFromCheckedItemsList(item);
            }
        }
    };
    DataTableComponent.prototype.addToCheckedItemsList = function (item) {
        this.criteria.checkedItems.push(item);
    };
    DataTableComponent.prototype.removeFromCheckedItemsList = function (item) {
        var _this = this;
        this.criteria.checkedItems.some(function (checkedItem, index) {
            if (checkedItem.id === item.id) {
                _this.criteria.checkedItems.splice(+index, 1);
                return true;
            }
        });
    };
    DataTableComponent.prototype.rotateSortingIcon = function () {
        return (this.criteria.sort.direction === 'DESC') ? 'inactive' : 'active';
    };
    DataTableComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    __decorate([
        core_1.Input()
    ], DataTableComponent.prototype, "tableName", void 0);
    __decorate([
        core_1.Input()
    ], DataTableComponent.prototype, "columns", void 0);
    __decorate([
        core_1.Input()
    ], DataTableComponent.prototype, "formUrl", void 0);
    __decorate([
        core_1.Input()
    ], DataTableComponent.prototype, "hasCheckColumn", void 0);
    __decorate([
        core_1.Input()
    ], DataTableComponent.prototype, "disableCheckAll", void 0);
    __decorate([
        core_1.Input()
    ], DataTableComponent.prototype, "hasActionsHeader", void 0);
    __decorate([
        core_1.Input()
    ], DataTableComponent.prototype, "showSearch", void 0);
    __decorate([
        core_1.Input()
    ], DataTableComponent.prototype, "limit", void 0);
    __decorate([
        core_1.Input()
    ], DataTableComponent.prototype, "isSelectable", void 0);
    __decorate([
        core_1.Input()
    ], DataTableComponent.prototype, "paginationClass", void 0);
    __decorate([
        core_1.Output()
    ], DataTableComponent.prototype, "fetchItems", void 0);
    DataTableComponent = __decorate([
        core_1.Component({
            selector: 'app-data-table',
            templateUrl: './data-table.component.html',
            styleUrls: ['./data-table.component.css'],
            animations: [
                animations_1.trigger('rotate', [
                    animations_1.state('inactive', animations_1.style({
                        transform: 'rotate(0)',
                    })),
                    animations_1.state('active', animations_1.style({
                        transform: 'rotate(180deg)',
                    })),
                    animations_1.transition('active => inactive', animations_1.animate('200ms')),
                    animations_1.transition('inactive => active', animations_1.animate('200ms'))
                ]),
                animations_1.trigger('fade', [
                    animations_1.state('inactive', animations_1.style({
                        display: 'none',
                        opacity: '0',
                    })),
                    animations_1.state('active', animations_1.style({
                        display: '*',
                        opacity: '1',
                    })),
                    animations_1.transition('active => inactive', animations_1.animate('200ms')),
                    animations_1.transition('inactive => active', animations_1.animate('200ms'))
                ])
            ]
        })
    ], DataTableComponent);
    return DataTableComponent;
}());
exports.DataTableComponent = DataTableComponent;
