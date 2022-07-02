<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Document extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function documentItems()
    {
        return $this->hasMany(DocumentItem::class);
    }

    public function entity()
    {
        return $this->belongsTo(Entity::class);
    }

    public static function saveInstance($fields, $updateInventory)
    {
        $model = new self;
        $model->fill($fields);

        if ($updateInventory) {
            $model->status = 'LOCKED';
        }

        return DB::transaction(function() use ($model, $fields, $updateInventory) {
            $model->save();
            DocumentItem::saveInstances($fields['items'], $model->id);

            self::updateInventory($fields, $updateInventory);
        });
    }

    public function updateInstance($fields, $updateInventory)
    {
        $this->fill($fields);

        if ($updateInventory) {
            $this->status = 'LOCKED';
        }

        DB::transaction(function () use($fields, $updateInventory) {
            $this->save();
            DocumentItem::where('document_id', $this->id)->delete();
            DocumentItem::saveInstances($fields['items'], $this->id);

            self::updateInventory($fields, $updateInventory);
        });
    }

    private static function updateInventory($fields, $updateInventory)
    {
        if ($fields['type'] !== 'central_invoice' && $updateInventory) {
            Inventory::updateStock(collect($fields['items']), $fields['type']);
        }
    }
}
