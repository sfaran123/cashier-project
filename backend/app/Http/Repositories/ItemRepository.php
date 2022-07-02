<?php

namespace App\Http\Repositories;

use Illuminate\Support\Facades\DB;

class ItemRepository
{
    public static function getItems()
    {
        return DB::table('items AS i')
            ->leftJoin('categories AS c', 'c.id', 'i.main_category_id')
            ->leftJoin('categories AS sc', 'sc.id', 'i.sub_category_id')
            ->leftJoin('suppliers AS s', 's.id', 'i.supplier_id')
            ->leftJoin('inventories AS in', function($join) {
                $join->on('i.id', 'in.item_id')->where('in.is_main', 1);
            })
            ->orderBy('i.id', 'DESC')
            ->select('s.name as supplier', 'sc.name as subCategory', 'c.name as category', 'i.*', 'in.units_in_stock');
    }
}
