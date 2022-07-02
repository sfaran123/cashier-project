<?php

namespace App\Http\Controllers;


use App\Mappers\DataTable\SuppliersMapper;
use App\Mappers\Request\SupplierMapper as SupplierRequestMapper;
use App\Http\Resources\SupplierViewResource;
use App\Http\Resources\SupplierResource;
use App\Models\Entity;
use App\Services\DataTableManager;
use App\Services\Helpers;
use Illuminate\Http\Request;
use App\Models\Supplier;

class SupplierController extends Controller
{
    public function index(Request $request)
    {
        $paginator = DataTableManager::getInstance(Supplier::query(), $request->all(), SuppliersMapper::map())->getQuery();

        return Helpers::dataTableResponse($paginator, SupplierResource::class);
    }

	public function store(Request $request)
	{
		$fields = SupplierRequestMapper::map($request);
		Supplier::saveInstance($fields);

        return response(['message'=> 'Supplier Created'], 201);
	}

    public function show(Supplier $supplier)
    {
        return response(new SupplierViewResource($supplier), 200);
    }

    public function update(Supplier $supplier, Request $request)
    {
        $fields = SupplierRequestMapper::map($request);
        $supplier->fill($fields);
        $supplier->save();

        return response(['message' => 'Supplier Updated'], 200);
    }

    public function select()
    {
        $supplier = Supplier::select('id','name', 'entity_id AS entityId')
            ->where('is_locked', 0)->get();

        return response($supplier, 200);
    }

    public function destroy(Supplier $supplier)
    {
        // todo move to entity controller
        Entity::find($supplier->entity_id)->delete();
        return response(['message' => 'Supplier deleted'],200);
    }
}
