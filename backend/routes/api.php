<?php

use Illuminate\Support\Facades\Route;

Route::post('register', 'UserController@store');
Route::post('login', 'IndexController@login');
Route::get('translation', 'GenericController@translation');

Route::middleware('auth:sanctum')->group(function () {

});

// Item

Route::get('item/select', 'ItemController@select');
Route::get('item/selectWithInventories', 'ItemController@selectWithInventories');
Route::resource('item', 'ItemController');
Route::post('item/search', 'ItemController@index');
Route::post('item/checkCodeExists', 'ItemController@checkCodeExists');
Route::resource('item', 'ItemController')->except(['index']);

// Excel

Route::post('excel/import', 'ImportController@import');
Route::get('excel/example', 'ImportController@example');

// Set

Route::post('set/search', 'SetController@index');
Route::resource('set', 'SetController')->except(['index']);

// Category

Route::get('category/select', 'CategoryController@select');
Route::resource('category', 'CategoryController')->except(['index']);
Route::post('categories', 'CategoryController@index');

// Supplier

Route::post('supplier/search', 'SupplierController@index');
Route::get('supplier/select', 'SupplierController@select');
Route::resource('supplier', 'SupplierController')->except(['index']);
Route::get('supplier/select', 'SupplierController@select');

// Document

Route::post('document/search', 'DocumentController@index');
Route::post('document/clientsDocumentsSummary', 'DocumentController@clientsDocumentsSummary');
Route::resource('document', 'DocumentController')->except(['index']);

// Central invoice

Route::post('central-invoice/search', 'CentralInvoiceController@index');
Route::resource('central-invoice', 'CentralInvoiceController')->except(['index']);

// Instruction

Route::post('instruction/search', 'InstructionController@index');
Route::resource('instruction', 'InstructionController');

// Group

Route::get('group/select', 'GroupController@select');
Route::resource('group', 'GroupController')->except(['index']);
Route::post('groups', 'GroupController@index');

// Client

Route::get('client/parent','ClientController@getParents');
Route::get('client/select', 'ClientController@select');
Route::resource('client', 'ClientController')->except(['index']);
Route::post('client/search', 'ClientController@index');

// Employee

Route::post('employee/search', 'EmployeeController@index');
Route::resource('employee', 'EmployeeController')->except(['index']);

// Menu element

Route::get('menu-element/tree', 'MenuElementController@tree');
Route::post('menu-element/search', 'MenuElementController@index');
Route::get('menu-element/main-menu-items', 'MenuElementController@mainMenuItems');
Route::put('menu-element/main-menu-items', 'MenuElementController@updateMainMenuItems');
Route::resource('menu-element', 'MenuElementController')->except(['index']);

// Menu item

Route::get('menu-item', 'MenuItemController@getMainScreenItems');
Route::post('menu-item/set', 'MenuItemController@setItems');

// Company

Route::resource('company', 'CompanyController')->except('index');
Route::post('company/search', 'CompanyController@index');
Route::resource('company', 'CompanyController')->except(['index']);

// Order

Route::resource('order', 'OrderController');

// Attendance

Route::resource('attendance', 'AttendanceController')->except('index');
Route::post('attendance/checkExistence', 'AttendanceController@shiftExistenceByDay');
Route::post('attendance/employeeReport', 'AttendanceController@ReportByEmployee');
