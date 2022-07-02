<?php

namespace App\Http\Controllers;

use App\Http\Repositories\StoreRepository;
use App\Http\Resources\StoreResource;
use App\Http\Resources\StoreViewResource;
use App\Mappers\DataTable\StoreMapper;
use App\Mappers\Request\StoreMapper as StoreRequestMapper;
use App\Models\Store;
use App\Services\DataTableManager;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function index(Request $request) {
        $paginator = DataTableManager::getInstance(StoreRepository::getStores(), $request->all(), StoreMapper::map())->getQuery();
        return response([
           'items' => StoreResource::collection(collect($paginator->items())),
            'total' => $paginator->total(),
            'lastPage' => $paginator->lastPage()
        ], 200);
    }

    public function store(Request $request) {
        $fields = StoreRequestMapper::map($request);
        Store::saveInstance($fields);
        return response(['message' => 'Store created'], 201);
    }

    public function show(Store $store) {
        return response(new StoreViewResource($store),200);
    }

    public function update(Request $request, Store $store) {
        $store->update(StoreRequestMapper::map($request));
        return response(['message' => 'Store updated'], 200);
    }

    public function destroy(Store $store) {
        $store->delete();
        return response(['message' => 'Store Deleted'], 200);
    }

}
