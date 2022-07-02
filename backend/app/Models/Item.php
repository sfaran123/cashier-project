<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;


class Item extends BaseModel
{
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function subCategory()
    {
        return $this->belongsTo(Category::class);
    }

    public function groupItem()
    {
        return $this->hasOne(GroupItem::class);
    }

    public function mainItemInventory()
    {
        return $this->hasOne(Inventory::class)->where('is_main', 1);
    }

    public function inventories()
    {
        return $this->hasMany(Inventory::class)->where('is_main', 0);
    }

    public function allInventories()
    {
        return $this->hasMany(Inventory::class);
    }

    public function instructions()
    {
        return $this->belongsToMany(Instruction::class, 'item_instructions');
    }

    public function extraItems()
    {
        return $this->hasMany(ItemExtraItem::class);
    }

    public function customerPrices()
    {
        return $this->hasMany(ItemCustomerPrice::class);
    }

	public static function saveInstance($fields)
	{
        $model = new self;
		$model->fill($fields);
		return DB::transaction(function() use ($model, $fields) {
			$model->save();
			$model->saveRelated($fields);
		});
	}

	private function saveRelated($fields)
    {
        $inventories = $fields['subItems'];

        $mainItemInventory = [
            'barcode' => $fields['code'],
            'isMain' => 1,
            'unitsInStock' => $fields['unitsInStock'] ? $fields['unitsInStock'] : 0
        ];

        array_push($inventories, $mainItemInventory);

        ItemExtraItem::saveInstances($fields['extraItems'], $this->id);
        Inventory::saveInstances($inventories, $this->id);
        ItemInstruction::saveInstances($fields['instructions'], $this->id);
        ItemCustomerPrice::saveInstances($fields['customerPrices'], $this->id);
    }

    public function updateInstance($fields)
    {
        $this->fill($fields);

        DB::transaction(function () use($fields) {
            $this->save();
            Inventory::where('item_id', $this->id)->delete();
            ItemExtraItem::where('item_id', $this->id)->delete();
            ItemInstruction::where('item_id', $this->id)->delete();
            ItemCustomerPrice::where('item_id', $this->id)->delete();

            $this->saveRelated($fields);
        });
    }
}
