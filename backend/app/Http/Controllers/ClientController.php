<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientsResource;
use App\Http\Resources\ClientResource;
use App\Http\Resources\GenericResource;
use App\Mappers\DataTable\ClientsMapper;
use App\Mappers\Request\ClientMapper;
use App\Models\Client;
use App\Services\DataTableManager;
use App\Services\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class ClientController extends Controller
{
    public function index(Request $request)
    {
        $paginator = DataTableManager::getInstance(Client::select('*'), $request->all(), ClientsMapper::map())->getQuery();

        return Helpers::dataTableResponse($paginator, ClientsResource::class);
    }

    public function select()
    {
        $client = Client::select('id', 'entity_id AS entityId',  DB::raw('CONCAT(first_name, last_name) as name'))->get();
        return response($client, 200);
    }

    public function getParents(Request $request)
    {
        $parents = Client::where('is_parent', 1)->where('id', '!=', $request->get('clientId'))
            ->select('id', DB::raw('CONCAT(first_name," ", last_name) as name'))->get();

        return response(GenericResource::collection($parents), 200);
    }

    public function store(Request $request)
    {
        $fields = ClientMapper::map($request);
        Client::saveInstance($fields);
        return response(['message' => 'Client created.'], 201);
    }

    public function show(Client $client)
    {
        return response(new ClientResource($client), 200);
    }

    public function update(Request $request, Client $client)
    {
        $client->update(ClientMapper::map($request));
        return response(['message' => 'Client updated'], 200);
    }

    public function destroy(Client $client)
    {
        $client->delete();
        return response(['message' => 'Client deleted'], 200);
    }
}
