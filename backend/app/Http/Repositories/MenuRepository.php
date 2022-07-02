<?php

namespace App\Http\Repositories;

use Illuminate\Support\Facades\DB;

class MenuRepository
{
    // todo remove
    public static function getMenus($parentId = null)
    {
        return DB::table('menus AS m')
            ->where('parent_id', $parentId)
            ->select('m.id', 'm.name', 'm.serial_number', 'm.color');
    }
}
