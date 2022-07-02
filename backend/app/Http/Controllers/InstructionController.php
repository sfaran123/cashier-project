<?php

namespace App\Http\Controllers;

use App\Http\Resources\InstructionsResource;
use App\Mappers\DataTable\InstructionsMapper;
use App\Mappers\Request\InstructionMapper;
use App\Models\Instruction;
use App\Services\DataTableManager;
use App\Services\Helpers;
use Illuminate\Http\Request;

class InstructionController extends Controller
{

    public function index(Request $request)
    {
        $paginator = DataTableManager::getInstance(Instruction::query(), $request->all(), InstructionsMapper::map())->getQuery();

        return Helpers::dataTableResponse($paginator, InstructionsResource::class);
    }

    public function show(Instruction $instruction)
    {
        return response(new InstructionsResource($instruction), 200);
    }

    public function select()
    {
        $instructions = Instruction::select('id', 'name')->get();
        return response($instructions, 200);
    }

    public function store(Request $request)
    {
        $fields = InstructionMapper::map($request);

        $model = new Instruction;
        $model->fill($fields);
        $model->save();

        return response(['message' => 'Instruction created.'], 201);
    }

    public function update(Request $request, Instruction $instruction)
    {
        $fields = InstructionMapper::map($request);
        $instruction->update($fields);

        return response(['message' => 'Instruction updated'], 200);
    }

    public function destroy(Instruction $instruction)
    {
        $instruction->delete();
        return response(['message' => 'Instruction deleted.'], 200);
    }
}
