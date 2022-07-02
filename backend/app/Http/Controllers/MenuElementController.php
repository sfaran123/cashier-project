<?php

namespace App\Http\Controllers;

use App\Http\Resources\MenuElementResource;
use App\Http\Resources\MenuElementsResource;
use App\Http\Resources\MenuElementsTreeResource;
use App\Http\Resources\MenuItemsResource;
use App\Mappers\Request\MenuElementMapper as MenuElementMapperRequest;
use App\Mappers\DataTable\MenuElementMapper;
use App\Models\MenuElement;
use App\Services\DataTableManager;
use App\Services\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MenuElementController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->get('type');
        $elements = MenuElement::where('parent_id', $request->get('parentId'));

        if ($type) {
            $elements->where('type', $type);
        }

        $paginator = DataTableManager::getInstance($elements, $request->all(), MenuElementMapper::map())->getQuery();


        return Helpers::dataTableResponse($paginator, MenuElementsResource::class);
    }

    public function tree(Request $request)
    {
//        MenuElement::where('register_id', $request->get('registerId'));
        $menuElement = MenuElement::whereNull('parent_id')->get();

        return response(MenuElementsTreeResource::collection($menuElement), 200);
    }

    public function mainMenuItems(Request $request)
    {
        $storeId = $request->get('storeId');
        $items = MenuElement::whereNull('parent_id')->where('type', 'item')->get();

        return response(MenuItemsResource::collection($items), 200);
    }

    public function updateMainMenuItems(Request $request)
    {
        DB::transaction(function () use ($request) {
            MenuElement::whereNull('parent_id')->where('type', 'item')->delete();
            MenuElement::saveMainMenuItems($request->get('menuItems'));
        });

        return response(['message' => 'Main menu items updated.'], 200);
    }

    public function store(Request $request)
    {
        $fields = MenuElementMapperRequest::map($request);
        $subMenus = $request->get('subMenus');
        $menuItems = $request->get('menuItems');

        MenuElement::saveInstance($fields, $subMenus, $menuItems);
        return response(['message' => 'Menu created.'], 201);
    }

    public function update(MenuElement $menuElement, Request $request)
    {
        $fields = MenuElementMapperRequest::map($request);
        $subMenus = $request->get('subMenus');
        $menuItems = $request->get('menuItems');
        $deletedIds = $request->get('deletedIds');

        $menuElement->updateInstance($fields, $subMenus, $menuItems, $deletedIds);

        return response(['message' => 'Menu updated.'], 200);
    }

    public function show(MenuElement $menuElement)
    {
        return response(new MenuElementResource($menuElement), 200);
    }

    public function destroy(MenuElement $menuElement)
    {
        $menuElement->delete();
        return response(['message' => 'Menu deleted.'], 200);
    }
}
