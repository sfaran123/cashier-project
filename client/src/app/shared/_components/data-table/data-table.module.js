"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var input_1 = require("@angular/material/input");
var form_field_1 = require("@angular/material/form-field");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var checkbox_1 = require("@angular/material/checkbox");
var button_1 = require("@angular/material/button");
var tooltip_1 = require("@angular/material/tooltip");
var data_table_component_1 = require("./data-table.component");
var pagination_component_1 = require("./pagination/pagination.component");
var DataTableModule = /** @class */ (function () {
    function DataTableModule() {
    }
    DataTableModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule,
                form_field_1.MatFormFieldModule, input_1.MatInputModule, slide_toggle_1.MatSlideToggleModule, checkbox_1.MatCheckboxModule, button_1.MatButtonModule, tooltip_1.MatTooltipModule
            ],
            exports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                form_field_1.MatFormFieldModule, input_1.MatInputModule, slide_toggle_1.MatSlideToggleModule, checkbox_1.MatCheckboxModule, button_1.MatButtonModule,
                router_1.RouterModule,
                pagination_component_1.PaginationComponent,
                data_table_component_1.DataTableComponent,
            ],
            declarations: [data_table_component_1.DataTableComponent, pagination_component_1.PaginationComponent],
        })
    ], DataTableModule);
    return DataTableModule;
}());
exports.DataTableModule = DataTableModule;
