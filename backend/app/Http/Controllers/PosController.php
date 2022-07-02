<?php

namespace App\Http\Controllers;

use App\Http\Repositories\PosRepository;
use App\Http\Resources\PosResource;
use App\Mappers\DataTable\PosMapper;
use App\Mappers\Request\PosMapper as PosRequestMapper;
use App\Models\Pos;
use App\Services\DataTableManager;
use Illuminate\Http\Request;

class PosController extends Controller
{
    public function index(Request $request) {
        $paginator = DataTableManager::getInstance(PosRepository::getPoses(), $request->all(), PosMapper::map())->getQuery();
        return response([
           'items' => PosResource::collection(collect($paginator->items())),
            'total' => $paginator->total(),
            'lastPage' => $paginator->lastPage()
        ], 200);
    }

    public function store(Request $request)
    {
        $fields = PosRequestMapper::map($request);
        Pos::saveInstance($fields);
        return response(['message' => 'Point of sale created'], 201);
    }

    public function show(Pos $pos)
    {
        return response(new PosResource($pos),200);
    }

    public function update(Request $request, Pos $pos)
    {
        $pos->update(PosRequestMapper::map($request));
        return response(['message' => 'point of sale updated'], 200);
    }

    public function destroy(Pos $pos)
    {
         $pos->delete();
         return response(['message' => 'Pos Deleted'], 200);
    }

}
