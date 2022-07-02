<?php

namespace App\Http\Controllers;

use App\Http\Repositories\ItemRepository;
use App\Http\Resources\ItemResource;
use App\Http\Resources\ItemsSelectResource;
use App\Mappers\DataTable\ItemMapper;
use App\Mappers\Request\ItemMapper as ItemRequestMapper;
use App\Services\DataTableManager;
use App\Http\Resources\ItemsResource;
use App\Models\Item;
use App\Services\Helpers;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        $paginator = DataTableManager::getInstance(ItemRepository::getItems(), $request->all(), ItemMapper::map())->getQuery();

        return Helpers::dataTableResponse($paginator, ItemsResource::class);
    }

    public function store(Request $request)
    {
        $fields = ItemRequestMapper::map($request);

        Item::saveInstance($fields);
		return response(['message' => 'Item created.'], 201);
    }

    public function select()
    {
        $items = Item::select('id', 'code','description AS name', 'customer_price AS customerPrice')->get();
        return response($items,200);
    }

    public function selectWithInventories()
    {
        return response(ItemsSelectResource::collection(Item::all()),200);
    }

    public function show(Item $item)
    {
        return response(new ItemResource($item),200);
    }

    public function update(Request $request, Item $item)
    {
        $fields = ItemRequestMapper::map($request);

        $item->updateInstance($fields);
        return response(['message' => 'Item updated.'], 200);
    }

    public function checkCodeExists(Request $request)
    {
        $exists = Item::where('code', $request->get('value'))->exists();
        return response(['exists' => $exists], 200);
    }

    public function destroy(Item $item)
    {
        $item->delete();
        return response(['message' => 'Item deleted.'], 200);
    }
}
