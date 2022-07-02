<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoriesResource;
use App\Http\Resources\CategoryResource;
use App\Mappers\DataTable\CategoryMapper;
use App\Mappers\Request\CategoryMapper as CategoryRequestMapper;
use App\Models\Category;
use App\Services\DataTableManager;
use App\Services\Helpers;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $paginator = DataTableManager::getInstance(Category::whereNull('parent_id'), $request->all(), CategoryMapper::map())->getQuery();

        return Helpers::dataTableResponse($paginator, CategoriesResource::class);
    }

    public function show(Category $category)
    {
        return response(new CategoryResource($category), 200);
    }

    public function select()
    {
        return response(CategoryResource::collection(Category::whereNull('parent_id')->get()), 200);
    }

    public function store(Request $request)
    {
        $fields = CategoryRequestMapper::map($request);
        Category::saveInstance($fields, $request->input('subCategories'));

        return response(['message' => 'Category created.'], 201);
    }

    public function update(Request $request, Category $category)
    {
        $fields = CategoryRequestMapper::map($request);
        $category->updateInstance($fields, $request->input('subCategories'));
        return response(['message' => 'Category updated'], 200);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response(['message' => 'Category deleted.'], 200);
    }
}
