"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PaginationData = /** @class */ (function () {
    function PaginationData(limit, currentPage) {
        this.limit = limit ? limit : 30;
        this.currentPage = currentPage && currentPage > 1 ? currentPage : 1;
    }
    return PaginationData;
}());
exports.PaginationData = PaginationData;
