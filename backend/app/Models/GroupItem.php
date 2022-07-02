<?php

namespace App\Models;

class GroupItem extends BaseModel
{
    public static function saveInstances($items, $groupId)
    {
        $insertData = [];

        foreach ($items as $item) {
            $item = collect($item);
            $data = [
                'item_id'    => $item->get('id'),
                'group_id'   => $groupId,
                'price'      => $item->get('price')
            ];

            $insertData[] = $data;
        }

        self::insert($insertData);
    }
}
