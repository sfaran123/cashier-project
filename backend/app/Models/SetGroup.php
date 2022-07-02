<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SetGroup extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public static function saveInstances($groups, $setId)
    {
        $groupsToInsert = [];

        foreach ($groups as $group) {
            $group = collect($group);

            $data = [
                'set_id'                => $setId,
                'group_id'              => $group->get('id'),
                'min_items'             => $group->get('minItems'),
                'max_items'             => $group->get('maxItems'),
                'free_items_allowed'    => $group->get('freeItemsAllowed'),
            ];

            $groupsToInsert[] = $data;
        }

        self::insert($groupsToInsert);
    }
}
