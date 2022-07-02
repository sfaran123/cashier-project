<?php

namespace App\Http\Repositories;

use Illuminate\Support\Facades\DB;

class StoreRepository
{

    public static function getStores()
    {
        return DB::table('stores as s')
            ->select('s.*');
    }
}
