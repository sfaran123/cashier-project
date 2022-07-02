<?php

namespace App\Http\Repositories;

use Illuminate\Support\Facades\DB;

class SetRepository
{
    public static function getSets()
    {
        return DB::table('sets AS s')
            ->leftJoin('categories AS c', 'c.id', 's.category_id')
            ->leftJoin('categories AS sc', 'sc.id', 's.sub_category_id')
            ->leftJoin('set_groups AS sg', 'sg.set_id', 's.id')
            ->groupBy('s.id')
            ->select('s.*', 'sc.name AS subCategory', 'c.name AS category',
                DB::raw('COUNT(sg.id) AS setGroups'));
    }
}
