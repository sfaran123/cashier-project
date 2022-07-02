<?php

namespace App\Http\Controllers;

use App\Http\Repositories\DocumentRepository;
use App\Http\Resources\ClientDocumentSummaryResource;
use App\Http\Resources\DocumentResource;
use App\Mappers\Request\DocumentMapper;
use App\Mappers\DataTable\DocumentsMapper;
use App\Http\Resources\DocumentsResource;
use App\Services\DataTableManager;
use App\Services\Helpers;
use Illuminate\Http\Request;
use App\Models\Document;
use Illuminate\Support\Str;

class DocumentController extends Controller
{
    public function index(Request $request)
    {
        $docType = Str::snake($request->get('documentType'));
        $query = $docType ? Document::where('type', $docType) : Document::query();

        $paginator = DataTableManager::getInstance($query->where('entity_type', $request->get('entityType')), $request->all(), DocumentsMapper::map())->getQuery();

        return Helpers::dataTableResponse($paginator, DocumentsResource::class);
    }

    public function store(Request $request)
    {
        $fields = DocumentMapper::map($request);

        Document::saveInstance($fields, $request->get('updateInventory'));
		return response(['message' => 'Document created.'], 201);
    }

    public function show(Document $document)
    {
        return response(new DocumentResource($document),200);
    }

    public function update(Request $request, Document $document)
    {
        $fields = DocumentMapper::map($request);

        $document->updateInstance($fields, $request->get('updateInventory'));
        return response(['message' => 'Document updated.'], 200);
    }

    public function destroy(Document $document)
    {
        $document->delete();
        return response(['message' => 'Document deleted.'], 200);
    }

    public function clientsDocumentsSummary(Request $request)
    {
        $query = DocumentRepository::clientsDocumentsSummary();

        $paginator = DataTableManager::getInstance($query, $request->all(), DocumentsMapper::map())->getQuery();

        return Helpers::dataTableResponse($paginator, ClientDocumentSummaryResource::class);
    }
}
