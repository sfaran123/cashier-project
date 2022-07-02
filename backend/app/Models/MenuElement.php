<?php

namespace App\Models;

use App\Mappers\Model\MenuElementMapper;
use Illuminate\Support\Facades\DB;

class MenuElement extends BaseModel
{
    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    public function subMenus()
    {
        return $this->hasMany(MenuElement::class, 'parent_id')->where('type', 'folder');
    }

    public function menuElements()
    {
        return $this->hasMany(MenuElement::class, 'parent_id');
    }

    public function items()
    {
        return $this->hasMany(MenuElement::class, 'parent_id')->where('type', 'item');
    }

    public function inventoryId()
    {
        return $this->hasOne(Inventory::class);
    }

    public static function saveInstance($fields, $subMenus, $menuItems)
    {
        $model = new self;
        $model->fill($fields);
        DB::transaction(function () use ($model, $subMenus, $menuItems) {
            $model->save();
            $model->saveRelated($subMenus, 'folder');
            $model->saveRelated($menuItems, 'item');
        });
    }

    public function updateInstance($fields, $subMenus, $menuItems, $deletedIds)
    {
        $this->fill($fields);

        DB::transaction(function () use ($subMenus, $menuItems, $deletedIds) {
            $this->save();

            if ($deletedIds) {
                self::whereIn('id', $deletedIds)->delete();
            }

            self::where('parent_id', $this->id)->where('type', 'item')->delete();

            $this->updateSubMenus($subMenus);
            $this->saveRelated($menuItems, 'item');
        });
    }

    private function saveRelated($elements, $type)
    {
        $elementsToInsert = [];

        foreach ($elements as $element) {
            $element = collect($element);
            $element->put('parentId', $this->id);
            $element->put('type', $type);

            $elementsToInsert[] = MenuElementMapper::map($element);
        }

        self::insert($elementsToInsert);
    }

    private function updateSubMenus($subMenus)
    {
        if (!($subMenusIds = collect($subMenus)->pluck('id')->toArray())) {
            return;
        }

        $subMenusToUpdate = collect(self::whereIn('id', $subMenusIds)->get());

        $subMenusToInsert = [];

        foreach ($subMenus as $subMenu) {
            $subMenu = collect($subMenu);
            $subMenu->put('parentId', $this->id);

            $fields = MenuElementMapper::map($subMenu);

            if ($subMenu->get('id')) {
                $menuToUpdate = $subMenusToUpdate->firstWhere('id', $subMenu->get('id'));
                $menuToUpdate->fill($fields);
                $menuToUpdate->save();
            } else {
                $subMenusToInsert[] = $fields;
            }
        }

        self::insert($subMenusToInsert);
    }

    public static function saveMainMenuItems($items)
    {
        $itemsToInsert = [];
        foreach ($items as $item) {
            $itemsToInsert[] = MenuElementMapper::map(collect($item));
        }

        self::insert($itemsToInsert);
    }
}
