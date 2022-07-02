<?php

namespace App\Http\Controllers;

use App\Http\Repositories\SetRepository;
use App\Http\Resources\SetResource;
use App\Http\Resources\SetsResource;
use App\Mappers\DataTable\SetsMapper;
use App\Mappers\Request\SetMapper;
use App\Models\Set;
use App\Services\DataTableManager;
use App\Services\Helpers;
use Illuminate\Http\Request;

class SetController extends Controller
{
    public function index(Request $request)
    {
        $sets = SetRepository::getSets();
        $paginator = DataTableManager::getInstance($sets, $request->all(), SetsMapper::map())->getQuery();


        return Helpers::dataTableResponse($paginator, SetsResource::class);
    }

    public function show(Set $set)
    {
        return response(new SetResource($set), 200);
    }

    public function store(Request $request)
    {
        $fields = SetMapper::map($request);
        Set::saveInstance($fields, $request->input('groups'));

        return response(['message' => 'Set created'], 201);
    }

    public function update(Request $request, Set $set)
    {
        $fields = SetMapper::map($request);
        $set->updateInstance($fields, $request->input('groups'));

        return response(['message' => 'Set updated'], 200);
    }

    public function destroy(Set $set)
    {
        $set->delete();
        return response(['message' => 'Set deleted'], 200);
    }
}
