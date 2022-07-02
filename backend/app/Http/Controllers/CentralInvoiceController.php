<?php

namespace App\Http\Controllers;

use App\Http\Resources\CentralInvoiceResource;
use App\Http\Resources\CentralInvoicesResource;
use App\Mappers\Request\CentralInvoiceMapper as CentralInvoiceRequestMapper;
use \App\Mappers\DataTable\CentralInvoiceMapper;
use App\Models\CentralInvoice;
use App\Services\DataTableManager;
use App\Services\Helpers;
use Illuminate\Http\Request;


class CentralInvoiceController extends Controller
{
    public function index(Request $request)
    {
        $paginator = DataTableManager::getInstance(CentralInvoice::query(), $request->all(), CentralInvoiceMapper::map())->getQuery();

        return Helpers::dataTableResponse($paginator, CentralInvoicesResource::class);
    }

    public function store(Request $request)
    {
        $fields = CentralInvoiceRequestMapper::map($request);
        CentralInvoice::saveInstance($fields);

        return response(['message' => 'Central invoice created.'], 201);
    }

    public function show(CentralInvoice $centralInvoice)
    {
        return response(new CentralInvoiceResource($centralInvoice), 200);
    }

    public function update(Request $request, CentralInvoice $centralInvoice)
    {
        $centralInvoice->update(CentralInvoiceRequestMapper::map($request));

        return response(['message' => 'Central invoice updated'], 200);
    }

    public function destroy(CentralInvoice $centralInvoice)
    {
        $centralInvoice->delete();

        return response(['message' => 'Central invoice deleted'], 200);
    }
}
