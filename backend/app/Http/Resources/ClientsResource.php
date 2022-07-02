<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientsResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id'        => $this->id,
            'idNumber'  => $this->ID_number,
            'number'    => $this->id,
            'name'      => $this->first_name . ' ' . $this->last_name,
            'birthDate' => $this->birth_date ? Carbon::parse($this->birth_date)->format('d/m/Y') : null,
            'phone'     => $this->phone,
            'balance'   => $this->balance,
            'obligo'    => $this->obligo,
            'isParent'  => $this->is_parent
        ];
    }
}
