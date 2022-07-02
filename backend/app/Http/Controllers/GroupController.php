<?php

namespace App\Http\Controllers;

use App\Http\Repositories\GroupRepository;
use App\Http\Resources\GenericResource;
use App\Mappers\Request\GroupMapper as GroupRequestMapper;
use App\Http\Resources\GroupsResource;
use App\Mappers\DataTable\GroupMapper;
use App\Http\Resources\GroupResource;
use App\Services\DataTableManager;
use App\Services\Helpers;
use Illuminate\Http\Request;
use App\Models\Group;

class GroupController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->get('type') ? $request->get('type') : 'items';

        $groups = GroupRepository::getGroups($type);
        $paginator = DataTableManager::getInstance($groups, $request->all(), GroupMapper::map())->getQuery();

        return Helpers::dataTableResponse($paginator, GroupsResource::class);
    }

    public function select(Request $request)
    {
        $type = $request->get('type') ? $request->get('type') : 'items';
        $groups = Group::where('type', $type)->select('id', 'name')->get();

        return response(GenericResource::collection($groups), 200);
    }

    public function store(Request $request)
    {
        $fields = GroupRequestMapper::map($request);
        Group::saveInstance(collect($request->input('items')), $fields);

        return response(['message' => 'Group created'], 201);
    }

    public function show(Group $group)
    {
        return response(new GroupResource($group), 200);
    }

    public function update(Request $request, Group $group)
    {
        $items = collect($request->input('items'));
        $group->updateInstance($items, $request->input('name'));

        return response(['message' => 'group updated'], 200);
    }

    public function destroy(Group $group)
    {
        $group->delete();
        return response(['message' => 'group deleted'], 200);
    }
}
