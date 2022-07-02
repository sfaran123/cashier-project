<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;

class CentralInvoice extends BaseModel
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function documents()
    {
        return $this->hasMany(CentralInvoiceDocument::class);
    }

    public static function saveInstance($fields)
    {
        $model = new self;
        $model->fill($fields);
        DB::transaction(function () use ($fields, $model) {
            $model->save();
            CentralInvoiceDocument::saveInstances($fields['documents'], $model->id);
        });
    }

}
