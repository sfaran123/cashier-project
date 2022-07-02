<?php

namespace App\Http\Controllers;

use App\Http\Repositories\MenuItemsRepository;
use App\Http\Resources\MenuItemsResource;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuItemController extends Controller
{
    // todo remove?
    public function setItems(Request $request)
    {
        if (MenuItem::setMenuItems(collect($request->input('menuItems')), null)) {
            return response(['Menu items updated'], 200);
        }
    }

    public function getMainScreenItems()
    {
          $items = MenuItemsRepository::getMainMenuItems();
          return response( ['menuItems'  => MenuItemsResource::collection($items)], 200);
    }
}
