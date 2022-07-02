<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * @property int $id
 * @property string $item_id
 * @property string $barcode
 * @property string $color
 * @property string $size
 * @property int $units_in_stock
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Inventory extends Model
{
    public static function saveInstances($subItems, $itemId = null)
    {
        $inventories = [];
        foreach ($subItems as $item) {
            $item = collect($item);

            if ($item->get('barcode')) {
                $inventories[] = [
                    'barcode' => $item->get('barcode'),
                    'item_id' => $itemId ? $itemId : $item->get('item_id'),
                    'is_main' => boolval($item->get('isMain')),
                    'size' => $item->get('size'),
                    'color' => $item->get('color'),
                    'units_in_stock' => $item->get('unitsInStock'),
                ];
            }
        }

        self::insert($inventories);
    }

    public static function updateStock(Collection $items, $documentType)
    {
        $inventoriesIds = $items->pluck('inventoryId');
        $inventories = collect(self::whereIn('id', $items->pluck('inventoryId'))->get());

        $itemsUnitsCount = $items->mapWithKeys(function ($item) {
            return [$item['inventoryId'] => $item['amount']];
        });

        $inventoriesToInsert = [];

        foreach ($itemsUnitsCount as $inventoryId => $unitsCount) {
            $inventory = $inventories->firstWhere('id', $inventoryId)->toArray();

            if ($documentType === 'credit_invoice') {
                $newUnitsCount = $inventory['units_in_stock'] - $unitsCount;
            } else {
                $newUnitsCount = $inventory['units_in_stock'] + $unitsCount;
            }

            $inventory['unitsInStock'] = $newUnitsCount;

            $inventoriesToInsert[] = $inventory;
        }

        self::whereIn('id', $inventoriesIds)->delete();
        self::saveInstances($inventoriesToInsert);
    }
}
