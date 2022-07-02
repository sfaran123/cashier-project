<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompaniesResource;
use App\Http\Resources\CompanyResource;
use App\Mappers\DataTable\CompanyMapper;
use App\Mappers\Request\CompanyMapper as CompanyRequestMapper;
use App\Models\Company;
use Illuminate\Http\Request;
use App\Services\DataTableManager;

class CompanyController extends Controller
{
    public function index(Request $request)
    {
		$companyId = $request->get('companyId');

		$query = Company::where('company_id', $companyId);

		$paginator = DataTableManager::getInstance($query, $request->all(), CompanyMapper::map())->getQuery();

		return response([
			'items'     => CompaniesResource::collection(collect($paginator->items())),
			'total'     => $paginator->total(),
			'lastPage'  => $paginator->lastPage()
		], 200);
    }

	public function store(Request $request)
	{
		$values = CompanyRequestMapper::map($request);
		$companyId = $request->input('companyId');

		Company::createInstance($values, $companyId);

		return response(['message' => 'Company created.'], 201);
	}

	public function show(Company $company)
	{
		return response(new CompanyResource($company));
	}

	public function update(Request $request, Company $company)
	{
		$values = CompanyRequestMapper::map($request);

		$company->updateInstance($values);

		return response(['message' => 'Company updated.'], 200);
	}

	public function destroy(Company $company)
	{
		$company->delete();

		return response(['message' => 'Company deleted.'], 200);
	}
}
