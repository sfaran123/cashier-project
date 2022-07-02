<?php

namespace App\Models;

use App\Processors\Attendance\DayTypeProcessor;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;


class ClockActivity extends BaseModel
{
    public static function newActivity($request)
    {
        $existingShift = DB::table('employee_shifts AS es')
            ->where('es.employee_id', $request->employeeId)
            ->whereDate('es.created_at', Carbon::now()->format('Y-m-d'))->first();

        if ($existingShift && $existingShift->status == 'not_signed') {
            EmployeeShift::where('id', $existingShift->id)->update(['status' => 'entry']);
            $shiftId = $existingShift->id;
        } else {
            $shiftId = EmployeeShift::saveInstance($request->employeeId);
        }

        if ($shiftId) {
            $shift = new self;
            $shift->shift_id = $shiftId;
            $shift->activity = 'entry';
            $shift->employee_id = $request->employeeId;

            if ($shift->save()) {
                return $shift;
            }
        }
        return false;
    }

    public static function updateActivity($data)
    {
        $employeeId = $data->employeeId;

        $clockActivity = new self;
        $clockActivity->employee_id = $employeeId;
        $clockActivity->shift_id = $data->get('shiftId');
        $clockActivity->activity = $data->get('type') === 'exitError' ? 'exit' : $data->get('type');

        if (!EmployeeShift::updateInstance($data, $employeeId)) {
            return false;
        }

        if(! $clockActivity->save()){
            return false;
        }

        return $clockActivity;
    }

}
