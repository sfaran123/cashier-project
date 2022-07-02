<?php

namespace App\Models;

use Illuminate\Support\Collection;

class MenuItem extends BaseModel
{
    public static function setMenuItems(Collection $menuItems, $parentMenuId) {
           self::where('menu_id', $parentMenuId)->delete();
           $insertData = [];
           foreach ($menuItems as $menuItem) {
               $menuItem = collect($menuItem);
               $data = [
                   'menu_id'        => $parentMenuId,
                   'item_id'               => $menuItem->get('code'),
                   'serial_number'         => $menuItem->get('serialNumber')

               ];
               $insertData[] = $data;
           }

           return self::insert($insertData);
    }

    public static function deleteItems($parentMenuId) {
        self::where('menu_id', $parentMenuId)->delete();
    }
}
