<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entity extends Model
{
    public function shippingCertificates()
    {
        return $this->hasMany(Document::class)->where('type', 'shipping_certificate');
    }

    public function details()
    {
        $model = 'App\Models\\' . ucwords($this->type);
        return $this->hasOne($model);
    }

    public static function saveInstance($type)
    {
        $model = new self;
        $model->type = $type;
        $model->save();

        return $model->id;
    }
}
