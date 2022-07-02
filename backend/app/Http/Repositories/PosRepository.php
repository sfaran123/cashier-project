<?php

namespace App\Http\Repositories;

use Illuminate\Support\Facades\DB;

class PosRepository
{

    public static function getPoses()
    {
        return DB::table('pos as p')
            ->select('p.*');
    }
}
