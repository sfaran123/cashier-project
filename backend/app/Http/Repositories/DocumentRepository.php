<?php

namespace App\Http\Repositories;

use Illuminate\Support\Facades\DB;

class DocumentRepository
{
    public static function clientsDocumentsSummary()
    {
        return DB::table('documents AS d')
            ->join('clients AS c', 'd.entity_id', 'c.entity_id')
            ->where('d.type', 'shipping_certificate')
            ->groupBy('c.entity_id')
            ->select('c.*', DB::raw('SUM(d.payment_sum) as sum'));
    }
}
