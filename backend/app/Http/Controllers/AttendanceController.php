<?php

namespace App\Http\Controllers;

use App\Http\Repositories\EmployeeShiftRepository;
use App\Http\Resources\EmployeeShiftResource;
use App\Models\ClockActivity;
use App\Models\Employee;
use App\Models\EmployeeShift;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function show(Request $request) {
        return response([

        ]);
    }
    public function  shiftExistenceByDay(Request $request) {
        $currentShift = EmployeeShift::checkExistenceByDay($request->get('employeeId'));

        return response(
           $currentShift != null ? new EmployeeShiftResource($currentShift) : [ 'message' => 'notExist']
        );
    }

    public function store(Request $request)
    {
        if ($request->type === 'entry') {
            $shift = ClockActivity::newActivity($request);

            return response([
                'shiftId' => $shift->shift_id,
                'entryTimestamp' => Carbon::parse($shift->created_at)->timestamp
            ], 201);

        } else {
            $response = ClockActivity::updateActivity($request);
        }

//        if ($response) {
//            return response([
//                'startLastBreakTimestamp' => Carbon::parse(($response->created_at))->timestamp,
//            ], 201);
//        }

        return response(['message' => 'Bad Request.'], 400);
    }
    public function ReportByEmployee(Request $request) {
        $response = EmployeeShiftRepository::getEmployeeReports($request->get('employeeId'), $request->get('year'), $request->get('month'));
        return response([
            'response' => $response
        ], 200);
    }
}
