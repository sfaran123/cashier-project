<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Set extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function groups()
    {
        return $this->belongsToMany(Group::class, 'set_groups');
    }

    public function setGroups()
    {
        return $this->hasMany(SetGroup::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function subCategory()
    {
        return $this->belongsTo(Category::class);
    }

    public static function saveInstance($fields, $groups)
    {
        $model = new self;
        $model->fill($fields);

        return DB::transaction(function () use ($model, $fields, $groups) {
            $model->save();
            SetGroup::saveInstances($groups, $model->id);
        });
    }

    public function updateInstance($fields, $groups)
    {
        $this->fill($fields);

        return DB::transaction(function () use ($fields, $groups) {
            $this->save();

            SetGroup::where('set_id', $this->id)->delete();
            SetGroup::saveInstances($groups, $this->id);
        });
    }
}
