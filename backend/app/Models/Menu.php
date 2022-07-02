<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Mappers\Request\MenuMapper as MenuRequestMapper;
use Illuminate\Support\Facades\DB;

class Menu extends BaseModel
{
    use HasFactory;

    public function childMenus()
    {
        return $this->hasMany(self::class, 'parent_id', 'id');
    }

    public function childItems()
    {
        return $this->hasMany(MenuItem::class, 'menu_id', 'id');
    }

    public static function saveInstance($request)
    {
        $fields = MenuRequestMapper::map($request);
        $model = new self;
        $model->fill($fields);
        $subMenus = collect($request->input('subMenus'));

        return DB::transaction(function () use ($model, $fields, $request, $subMenus) {
            $model->save();
            self::setSubMenus($subMenus, $model->id);
            MenuItem::setMenuItems(collect($request->input('menuItems')), $model->id);
        });
    }

    private static function setSubMenus($subMenus, $parentId, Array $deletedIds)
    {
        self::whereIn('id', $deletedIds)->delete();
        self::whereIn('parent_id', $deletedIds)->delete();
        $insertData = [];
        foreach ($subMenus as $subMenu) {
            $subMenu = collect($subMenu);
            if ($subMenu->get('id'))
            {
                $update = self::find($subMenu->get('id'));
                $update->name = $subMenu->get('name');
                $update->serial_number = $subMenu->get('serialNumber');
                $update->color = $subMenu->get('color');
                $update->save();
                continue;
            }

            $data = [
                'name'          => $subMenu->get('name'),
                'parent_id'     => $parentId,
                'serial_number' => $subMenu->get('serialNumber'),
                'color'         => $subMenu->get('color'),
            ];

            $insertData[] = $data;
        }
        self::insert($insertData);
    }

    public function deleteInstance($menu)
    {
        return DB::transaction(function () use ($menu) {
           MenuItem::deleteItems($menu->id);
           self::where('parent_id', $menu->id)->delete();
           //todo recurse to delete all children
           $menu->delete();
        });
    }

    public function updateInstance($fields, $subMenus, $menuItems, $deletedIds)
    {
        return DB::transaction(function () use ($fields, $subMenus, $menuItems, $deletedIds) {
            $subMenus = collect($subMenus);
            $this->update($fields);
            $this->setSubMenus($subMenus, $this->id, $deletedIds);
            MenuItem::setMenuItems(collect($menuItems), $this->id);
        });
    }
}
