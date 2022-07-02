<?php

namespace App\Http\Repositories;

use Illuminate\Support\Facades\DB;

class GroupRepository
{
    public static function getGroups($type)
    {
        return DB::table('groups AS g')
            ->leftJoin('group_items AS gi', 'gi.group_id', 'g.id')
            ->where('g.type', $type)
            ->groupBy('g.id')
            ->select('g.*', DB::raw('COUNT(gi.id) AS itemsCount'));
    }
}
