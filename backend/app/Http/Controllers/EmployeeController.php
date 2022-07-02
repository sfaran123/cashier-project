<?php

namespace App\Http\Controllers;

use App\Http\Resources\EmployeesResource;
use App\Http\Resources\EmployeeResource;
use App\Mappers\DataTable\EmployeesMapper;
use App\Mappers\Request\EmployeeMapper;
use App\Models\Employee;
use App\Services\DataTableManager;
use App\Services\Helpers;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $paginator = DataTableManager::getInstance(Employee::query(), $request->all(), EmployeesMapper::map())->getQuery();

        return Helpers::dataTableResponse($paginator, EmployeesResource::class);
    }

    public function store(Request $request)
    {
        $fields = EmployeeMapper::map($request);
        Employee::saveInstance($fields);

        return response(['message' => 'Employee created'], 201);
    }

    public function show(Employee $employee)
    {
        return response(new EmployeeResource($employee), 200);
    }

    public function update(Request $request, Employee $employee)
    {
        $fields = EmployeeMapper::map($request);
        $employee->update($fields);

        return response(['message' => 'Employee updated'], 200);
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response(['message' => 'Employee deleted'], 200);

    }
}
