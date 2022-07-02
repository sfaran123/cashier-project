<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeShiftResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'                        => $this->id,
            'createdAt'                 => $this->created_at,
            'dayType'                   => $this->day_type,
            'employeeId'                => $this->employee_id,
            'overTime125'               => $this->overtime_125,
            'overTime150'               => $this->overtime_150,
            'overTime175'               => $this->overtime_175,
            'overTime200'               => $this->overtime_200,
            'standardHour'              => $this->standard_hours,
            'status'                    => $this->status,
            'sumBreak'                  => $this->sum_break,
            'sumWork'                   => $this->sum_work,
            'updatedAt'                 => $this->updated_at,
        ];
    }
}
