<?php

namespace App\Models;
use Illuminate\Support\Facades\DB;

class Group extends BaseModel
{
    public function items()
    {
        return $this->belongsToMany(Item::class, 'group_items');
    }

    public static function saveInstance($items, $fields)
    {
        $model = new self;
        $model->fill($fields);

        DB::transaction(function () use ($model, $fields, $items) {
            $model->save();
            GroupItem::saveInstances($items, $model->id);
        });
    }

    public function updateInstance($items, $groupName)
    {
        DB::transaction(function () use ($items, $groupName) {
            $this->name = $groupName;
            $this->update();

            GroupItem::where('group_id', $this->id)->delete();
            GroupItem::saveInstances($items, $this->id);
        });
    }
}
