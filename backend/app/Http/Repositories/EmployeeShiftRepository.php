<?php

namespace App\Http\Repositories;

use Illuminate\Support\Facades\DB;

class EmployeeShiftRepository
{

    public static function getEmployeeReports($employeeId, $year, $month)
    {
        return DB::table('employee_shifts AS es')
//            ->leftJoin('employees as e', 'es.employee_id', 'e.id')
            ->leftJoin('clock_activities as cas', function ($join) {
                $join->on('cas.shift_id', 'es.id')->where('cas.activity', 'entry');
            })
            ->leftJoin('clock_activities as cae', function ($join) {
                $join->on('cae.shift_id', 'es.id')->where('cae.activity', 'exit');
            })

            ->select('es.*', 'cas.created_at as entry', 'cae.created_at as exit')
            ->groupBy('es.id')
            ->where('es.employee_id', $employeeId)
            ->whereMonth('es.created_at', $month)
            ->whereYear('es.created_at', $year)
            ->get();
    }

}
