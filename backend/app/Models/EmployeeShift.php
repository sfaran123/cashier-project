<?php

namespace App\Models;



use Carbon\Carbon;

class EmployeeShift extends BaseModel
{
    public static function saveInstance($employeeId)
    {
        $shift = new self;
        $shift->employee_id = $employeeId;
        $shift->status = 'entry';
        $shift->day_type = 'regular';

        if ($shift->save()) {
            return $shift->id;
        }

        return false;
    }

    public static function checkExistenceByDay($employeeId) {
        return EmployeeShift::whereDate('created_at', Carbon::now()->format('Y-m-d'))
            ->where('employee_id', $employeeId)
            ->where('status', 'entry')
            ->first();

    }

    public static function updateInstance($data, $employeeId)
    {
        $data = collect($data);

        $shiftQ = self::where('id', $data->get('shiftId'));
        $shift = $shiftQ->first();


            $activity = $data->get('type') === 'end_break' ? 'sum_break' : 'exit';
            $sum = (Carbon::parse($shift->created_at)
                ->diffInSeconds(Carbon::now()->format('Y-m-d H:i:s')));

            if ($activity === 'exit') {
                $updatedColumns = self::getColumnsTouUpdate($sum, null, 'regular');

                if ($data->get('type') === 'exitError') {
                    $updatedColumns['status'] = 'exit_error';
                }

            }

        $updatedColumns['status'] = isset($updatedColumns) && isset($updatedColumns['status']) ? $updatedColumns['status'] : $data->get('type');

        return $shiftQ->update($updatedColumns);
    }

    public static function getColumnsTouUpdate($sum, $shift = null, $dayType = null)
    {

        if ($dayType) {
            $updatedColumns['day_type'] = $dayType;
        }

        //TODO separate hours by position
        $updatedColumns['standard_hours'] = $sum;

        $updatedColumns['sum_work'] = $sum;


        return $updatedColumns;
    }


    public function clockActivities()
    {
        return $this->hasMany('App\Models\ClockActivity', 'shift_id');
    }

}
