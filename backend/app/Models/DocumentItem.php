<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentItem extends Model
{
    public function item()
    {
        return $this->hasOne(Item::class, 'id', 'item_id');
    }

    public function inventory()
    {
        return $this->hasOne(Inventory::class, 'id', 'inventory_id');
    }

    public static function saveInstances($items, $documentId)
    {
        $itemsToInsert = [];

        foreach ($items as $item) {
            $item = collect($item);
            $data = [
                'document_id'   => $documentId,
                'item_id'       => $item->get('id'),
                'inventory_id'  => $item->get('inventoryId'),
                'amount'        => $item->get('amount'),
                'price'         => $item->get('price') ?? $item->get('customerPrice'),
                'discount'      => $item->get('discount'),
            ];

            $itemsToInsert[] = $data;
        }

        self::insert($itemsToInsert);
    }
}
