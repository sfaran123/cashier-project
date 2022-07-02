<?php

namespace App\Http\Repositories;

use Illuminate\Support\Facades\DB;

class MenuItemsRepository
{
    public static function getMainMenuItems()
    {
        return DB::table('menu_items as mi')
            ->where('menu_id', null)
//            ->join('items as i','i.id', 'im.item_id')
            ->select('mi.*')
            ->get();
    }
}
